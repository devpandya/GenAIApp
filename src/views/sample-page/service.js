const { string } = require('prop-types');

import axios from 'axios';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"],
  dangerouslyAllowBrowser: true
});

const apiInstance = axios.create({
  baseURL: 'https://916ozy0t8b.execute-api.eu-west-1.amazonaws.com/Prod/api/PersonAI',
  timeout: 1000
});

export const getGeneratedJSON = async (string, setLoading) => {
  setLoading(true);
  //const localFields = await apiInstance.post(`/GetCommaSeparetedStringToList?inputData=${string}`);
  const localFields = await generateFields(string);
  console.log(localFields);
  return localFields;
};

export const postData = async (id, data) => {
  const podtResp = await apiInstance.post(`/AddPersonData?id=${id}`, data);
  return podtResp;
};

export const getValues = async () => {
  const getResp = await apiInstance.get(`/GetAllValues`);
  return getResp?.data;
};

const getFieldsNamesFromFirstLineString = (str) => {
  const fields = str.split('\n')[0].split('\t');
  return fields;
};

const createObjectFromKeysAndValues = (keys, values) => {
  const obj = {};
  keys.forEach((key, index) => {
    obj[key] = values[index];
  });
  return obj;
};

const getFieldValuesFromRestLinesString = (keys, str) => {
  const fields = str.split('\n');
  const values = [];
  for (let i = 1; i < fields.length; i++) {
    values.push(createObjectFromKeysAndValues(keys, fields[i].split('\t')));
  }
  return values;
};

const range = (min, max) => {
  return ({ value }) => {
    return parseInt(value) >= min && parseInt(value) <= max ? undefined : 'Invalid range';
  };
};

const email = () => {
  return ({ value }) => {
    return value?.includes('@') ? undefined : 'Invalid email';
  };
};

const uppercase = () => {
  return ({ value }) => {
    debugger;
    return value?.toUpperCase() === value ? undefined : 'Please enter every letter in uppercase';
  };
};

const generateValidationFunctions = async (validations) => {
  const validationFunctions = [];
  await Promise.all(
    validations.map(async (validation) => {
      if (validation?.trim()) {
        const func = await generateCodeFromChatGPT(validation);
        const funcString = extractFunctionFromChatGptResponse(func);
        const actFunction = convertJavascriptStringToAFunction(funcString);
        validationFunctions.push(actFunction);
      }
    })
  );
  return validationFunctions;
};

export const generateFields = async (str) => {
  const keys = getFieldsNamesFromFirstLineString(str);
  const values = getFieldValuesFromRestLinesString(keys, str);
  const pgTitle = values[0][keys[0]];
  const locFields = await Promise.all(
    values?.map(async (item) => {
      const validations = item?.Validation?.split(',')?.filter((item) => item?.trim() !== 'required');
      const required = item?.Validation?.includes('required');
      const dataType = item?.DataType || 'text';
      const generatedValidation = validations && (await generateValidationFunctions(validations));
      return {
        id: item?.Id || item?.Field,
        key: item?.Id || item?.Field,
        label: { text: item?.Field },
        placeholder: item?.Field,
        required: required,
        value: item?.id,
        type: dataType,
        variant: 'outlined',
        fullWidth: true,
        section: item?.Section,
        validations: generatedValidation
      };
    })
  );
  const section = await divideFieldsIntoSections(locFields);
  debugger;
  return { section, locFields, pgTitle };
};

export const divideFieldsIntoSections = (fields) => {
  const sections = [];
  debugger;
  fields.forEach((field) => {
    if (field?.section?.trim() && !sections?.find((section) => section?.id === field?.section)) {
      sections.push({
        id: field?.section?.trim(),
        title: field?.section?.trim()
      });
    }
  });
  debugger;
  sections.forEach((section) => {
    section.fields = fields.filter((field) => field?.section?.trim() === section?.id);
  });
  return sections;
};

export const mockApiCall = async (string) => {
  const filds = string.trim().split(',');
  const locFields = filds?.map((item) => {
    const required = item?.trim()?.indexOf('*') > -1;
    const key = item?.split('*')?.length > 1 ? item?.split('*')[0] : item;
    return {
      id: key,
      key: key,
      label: { text: key },
      placeholder: key,
      required: required,
      value: '',
      type: 'text',
      variant: 'outlined',
      fullWidth: true
    };
  });
  return locFields;
};

export const generateCodeFromChatGPT = async (str) => {
  const prmpt = `generate a validation function based upon for the following text in javascript and return a message if not valid and blank if valid. ${str}`;
  debugger;
  const resp = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prmpt }],
    model: 'gpt-3.5-turbo'
  });
  return resp;
};

const extractFunctionFromChatGptResponse = (resp) => {
  const text = resp?.choices?.[0]?.message?.content?.trim();
  let funcString = text?.split('```javascript\n')[1]?.trim()?.split('\n```')[0]?.trim();
  //remove example usages
  if (funcString?.includes('// Example usage')) {
    funcString = funcString?.substring(0, funcString?.indexOf('// Example usage') - 1)?.trim();
  }
  return funcString;
};

const convertJavascriptStringToAFunction = (str) => {
  const args = getFunctionArgsFromString(str);
  const body = getFunctionBodyFromString(str);
  const newFunc = new Function(...args, body);
  return newFunc;
};

const getFunctionArgsFromString = (str) => {
  return str?.split('(')[1]?.split(')')[0]?.split(',');
};

const getFunctionBodyFromString = (str) => {
  return str?.substring(str.indexOf('{') + 1, str.lastIndexOf('}'));
};
