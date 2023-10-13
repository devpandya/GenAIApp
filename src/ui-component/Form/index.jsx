import React, { useCallback, useEffect } from 'react';
import { Button, TextField, Grid, InputLabel, Autocomplete, Checkbox, Radio, RadioGroup,} from '@mui/material';
import { generateMessages, generatePlaceholders } from './FormFunctions';
import { ControlType } from './FormEnums';
import './Form.css';

const Form = ({ initialFields, buttons: buttons = [], loading: loading = false, children, translations }) => {
  const [fields, setFields] = React.useState(initialFields);
  const refFields = React.useRef(fields);
  useEffect(() => {
    if (initialFields?.length > 0) {
      setFields(initialFields);
    }
  }, [initialFields]);

  /**
   * @description set a field property value
   * @param key
   * @param property
   * @param value
   */
  const setField = (key, property, value) => {
    setFields((prevFields) => {
      const index = prevFields.findIndex((field) => field.key === key);
      const newFields = [...prevFields];
      newFields[index] = {
        ...newFields[index],
        [property]: value,
      };
      return newFields;
    });
  };

  /**
   * @description on change event for input fields
   * @param target
   * @param field
   * @returns void
   */
  const onChange = ({ target }, field) => {
    setFields((prevFields) => {
      const index = prevFields.findIndex((fiel) => fiel.key === field.key);
      const newFields = [...prevFields];
      newFields[index] = {
        ...newFields[index],
        value: target.value,
        error: '',
      };
      refFields.current = newFields;
      return newFields;
    });
  };

  /**
   * @description validate all fields
   * @returns boolean
   */
  const validateFields = () => {
    let isValid = true;
    refFields.current.forEach((field) => {
      if (field.required && !field.value?.trim()) {
        setField(
          field.key,
          'error',
          `${generatePlaceholders(translations, field.label?.text)} ${generatePlaceholders(translations, 'is required')}`
        );
        isValid = false;
      } else {
        if (field?.validations?.length > 0) {
          field?.validations?.forEach((validation) => {
            const message = validation(field);
            if (message) {
              setField(field.key, 'error', generateMessages(translations, message));
              isValid = false;
            } else {
              setField(field.key, 'error', '');
            }
          });
        } else {
          setField(field.key, 'error', '');
        }
      }
    });
    return isValid;
  };

  /**
   * @description on click event for buttons
   * @param shouldValidate
   * @param executeClick
   */
  const onClick = async (shouldValidate, executeClick) => {
    const validate = shouldValidate ? validateFields() : true;
    if (validate) {
      let postObject = {};
      fields?.map((field) => (postObject[field.key] = field.value || refFields.current.find((f) => f.key === field.key)?.value));
      executeClick(postObject);
    }
  };

  /**
   * @description get control by type
   * @param field
   * @returns JSX.Element
   */
  const getControlByType = (field) => {
    switch (field.type) {
      case ControlType.FILE:
        return (
          <>
            <InputLabel htmlFor={`upload_${field.key}`} sx={{ mb: 1 }}>
              {generatePlaceholders(translations, field.placeholder)}
            </InputLabel>
          <Button id={`upload_${field.key}`} variant="contained" component="label">
              {generatePlaceholders(translations, "UPLOAD_FILE")}
              <input
                type="file"
                hidden
                onChange={field.onChange}
              />
            </Button>
          </>
        );
      case ControlType.SELECT:
      case ControlType.AUTO_COMPLETE:
        return(<Autocomplete
            placeholder={generatePlaceholders(translations,field.placeholder)}
            helperText={field?.error ? field?.error : ''}
            isLabelIconVisible={field?.label?.onIconClick  ? true: false}
            label={field?.label?.text}
            onChange={(e) => onChange(e, field)}
            size="small"
            optionKey="label"
            options={field?.options?.map(ele => ({id: ele.value, label:ele.label}))}
            sx={{width:'100%'}}
            value={field?.value ? field?.value : ''}
          />)
      case ControlType.HIDDEN:
        return (<></>);
      case ControlType.TEXTAREA:
        return (
          <TextField
            type="multiline"
            required={field.required}
            placeholder={generatePlaceholders(translations, field.placeholder)}
            value={field?.value ? field?.value : ''}
            style={{ backgroundColor: 'white' }}
            fullWidth
            error={field?.error ? true : false}
            helperText={field?.error ? field?.error : ''}
            onChange={(e) => onChange(e, field)}
            size="small"/>
        );
      case ControlType.RADIO:
        return(
          <RadioGroup
            label={field?.label?.text}
            name="radio-button-group"
            onChange={(e) => onChange(e, field)}
            value={field?.value ? field?.value : ''}
          >
            {
              field?.options?.map((option) => {
                return <Radio key={option.label} value={option.value} label={option.label} />;
              })
            }
            </RadioGroup>
        )
        case ControlType.CHECKBOX:
          return( <Checkbox
            onChange={(e) => onChange(e, field)}
            label={field?.label?.text}

          />)          
        case ControlType.PASSWORD:
        case ControlType.NUMBER:
        case ControlType.DATE:
        case ControlType.DATETIME:
        case ControlType.TIME:
        case ControlType.INPUT:
        default:
          return (
            <TextField
              label={field?.label?.text}
              required={field.required}
              placeholder={generatePlaceholders(translations,field.placeholder||field?.label?.text)}
              value={field?.value ? field?.value : ' '}
              style={{ backgroundColor: 'white' }}
              fullWidth
              error={field?.error ? true : false}
              helperText={field?.error ? field?.error : ''}
              type={field.type ? field.type : 'text'}
              onChange={(e) => onChange(e, field)}
              size="small"
            />
          );
      }
    };

  /**
   * @description generate fields with labels based upon the fields array
   * @returns JSX.Element
   */
  const generateFields = 
    () =>
      fields?.map((field) => {
        const size = field.size ? field.size : { lg: '6', md: '6', xs: '12' };
        return (
          <Grid item key={field?.key} {...size} className='formFieldsWrapper'>
            {getControlByType(field)}
          </Grid>
        );
    });

  /**
   * @description generate buttons based upon the buttons array
   * @returns JSX.Element
   */
  const generateButtons = useCallback(
    () =>
      buttons?.map((button) => {
        return (
          <Button
          key={button.key}
            id={button.key}
            onClick={() => onClick(button?.validateFields, button.onClick)}
            disabled={loading || button.disabled}
            color={button.color}
            variant={button.variant}
          >
            {generatePlaceholders(translations, button.label)}
          </Button>
        );
      }),
    [buttons, generatePlaceholders, loading, onClick],
  );

  const [functionMapping, setFunctionMapping] = React.useState({
    fields: generateFields,
    buttons: generateButtons,
  });

  useEffect(() => {
    setFunctionMapping({
      fields: generateFields,
      buttons: generateButtons,
    });
  }, [generateFields, generateButtons, setFunctionMapping]);

  return children?.map((child) => {
    return React.cloneElement(child, {
      children: child?.key && functionMapping[child?.key] ? functionMapping[child?.key]() : child
    });
  });
};

export default Form;
