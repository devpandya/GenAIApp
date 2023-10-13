const { string } = require('prop-types');

import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://916ozy0t8b.execute-api.eu-west-1.amazonaws.com/Prod/api/PersonAI',
  timeout: 1000
});

export const getGeneratedJSON = async (string) => {
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

const generateValidationFunctions = (validations) => {
  const validationFunctions = [];
  validations.forEach((validation) => {
    if (validation?.trim() === 'email') {
      validationFunctions.push(email());
    }
    if (validation?.trim()?.includes('range')) {
      const min = validation?.trim()?.split('range')[1]?.split('-')[0];
      const max = validation?.trim()?.split('range')[1]?.split('-')[1];
      validationFunctions.push(range(parseInt(min), parseInt(max)));
    }
    if (validation?.trim() === 'uppercase') {
      validationFunctions.push(uppercase());
    }
  });
  return validationFunctions;
};

export const generateFields = async (str) => {
  const keys = getFieldsNamesFromFirstLineString(str);
  const values = getFieldValuesFromRestLinesString(keys, str);
  const pgTitle = values[0][keys[0]];
  const locFields = values?.map((item) => {
    const validations = item?.Validation?.split(',')?.filter((item) => item?.trim() !== 'required');
    const required = item?.Validation?.includes('required');
    const dataType = item?.DataType || 'text';
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
      validations: validations && generateValidationFunctions(validations)
    };
  });
  return { locFields, pgTitle };
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
