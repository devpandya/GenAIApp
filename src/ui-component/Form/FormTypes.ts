import { ControlType } from "./FormEnums"

/**
 * @description The Form Control Label type
 */
export type ControlLabelProps = {
  id:string,
  element: any,
  text: string,
  icon: string,
  iconPosition: string,
  style: any,
  onClick: Function,
  onIconClick: Function,
  className?: string,
}

/**
 * @description The Form Field type
 * 
 */
export type FieldProps = {
  /**
   * @description The id of the field
   * @type {string}
   * @example 'name'
   */
  id:string,
  /**
   * @description The key of the field, ideally the same as the key in the data object
   * @type {String}
   */
    key: string,
    /**
   * @description The value of the field, ideally the same as the value in the data object
   * @type {string}
   */
    value: string,
    /**
   * @description The error message to be displayed when the field is invalid
   * @type {string}
   */
    error: string,
    /**
   * @description Whether the field is required or not
   * @type {boolean}
   */
    required: boolean,
    /**
   * @description The validations to be applied to the field
   * @type {Array}
   */
    validations: Array<Validation>,
    /**
     * @description The label of the field
     * @type {string}
     */
    label:ControlLabelProps,
    /**
     * @description The placeholder of the field
     * @type {string}
     */
    placeholder:string,
    /**
     * @description The type of the field
     * @type {ControlType}
     * @example ControlType.INPUT
     * @example ControlType.SELECT
     * @example ControlType.TEXTAREA
     */
    type: ControlType,   
    /**
     * @description The options of the select field
     * @type {Array}
     */
    options: Array<Option>,
    /**
     * @description The size of the field in Grid format
     * @type {Object}
     * @example { lg: 6, md: 6, xs: 12 }
     */
      size: any,
        /**
         * @description The size of the field in Grid format
         * @type {Object}
         * @example small/medium/large
         */
      vsize: String,
      /**
       * @description The onChange event handler name of the field
       */
      onChange: React.ChangeEventHandler,
      /**
       * @description The onBlur event handler name of the field
       * @type {Function}
       */
      onBlur: Function,
      /**
       * @description The onFocus event handler name of the field
       * @type {Function}
       */
      onFocus: Function,
      /**
       * 
       * @description css Class name
       * @type {string}
       * @example 'form-control'
       */
      className?: string,
      /**
      * @description The initial fields to be displayed in the form
      * @type {Array}
      * @example [{key: 'name', value: 'John Doe', error: '', required: true, validations: {minLength: 3}, label: 'Name', placeholder: 'Enter your name', type: 'text', size: { lg: 6, md: 6, xs: 12 }}]
      */
      initialFields: Array<FieldProps>;
     /**
      * @description The columns to show in table controle type
      * @type {Array}
      * @example [{key: 'name', name: 'Name'}]
      */
    columns: Array<any>;
     /**
      * @description The data to show in table controle type
      * @type {Array}
      * @example [{key1: 'value1', key2: 'val2'},{key1: 'value11', key2: 'val22'}]
      */
    data: Array<any>;
}

type ButtonProps = {
    /**
     * @description The key of the button, ideally the same as the key in the data object
     * @type {string}
     * @example 'save'
     */
    key:string,
    /**
     * @description The label of the button
     * @type {string}
     * @example 'Save'
     */
     label: string,
    /**
     * @description The size of the button in Grid format
     * @type {any}
     * @example { lg: 2, md: 2, xs: 12 }
     */
    size: any,
    /**
     * @description The color of the button
     * @type {string}
     * @example 'primary'
     * @example 'secondary'
     * @example 'default'
     */
    color?: any,
    /**
     * @description The variant of the button
     * @type {string}
     * @example 'contained'
     * @example 'outlined'
     */
    variant?: any,
    /**
     * @description The onClick event handler of the button
     * @type {string}
     */
    /**
     * @description The onClick event handler of the button
     * @type {Function}
     * @example () => { console.log('clicked') }
     */
    onClick: Function,
    /**
     * @description Whether to validate the fields before submitting the form
     * @type {boolean}
     * 
     */
    validateFields:boolean,
    /**
     * @description Whether the button is disabled or not
     */
    disabled:boolean
}


export type Validation = {
    function: Function,
}

export type Option = {
    value: string,
    label: string
}

/**
 * @description The Form Props type
 */
export type FormProps = {
  /**
 * @description The initial fields to be displayed in the form
 * @type {Array}
 * @example [{key: 'name', value: 'John Doe', error: '', required: true, validations: {minLength: 3}, label: 'Name', placeholder: 'Enter your name', type: 'text', size: { lg: 6, md: 6, xs: 12 }}]
 */
  initialFields: Array<FieldProps>;
  /**
   * @description The initial buttons to be displayed in the form
   */
  buttons?: Array<ButtonProps>;
  /**
   * @description is loading
   */
  loading: boolean;
  /**
   * @description Form Children components
   */
  children: any;
  /**
   * @description text translations for the form
   * @type {Object}
   */
  translations?: Object;
  /**
   * @description The onSubmit event handler of the form
   * @type {Function}
   * @example () => { console.log('submitted') }
   */
  registerClick? :any;
}
