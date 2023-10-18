export type MasterUISectionProps = {
  id?: number;
  title: string;
  initialFields: any;
  info: string;
  registerClick: any;
  loading: boolean;
  translations?: any;
  onReset?: any;
  selectedItem?:any,
  onSectionToggleHandler?: (id: number) => void; 
};


export type MasterUIFormLayoutProps = {
  /**
   * @description Form Config is a collection of sections and actions
   */
  config: any;
  otherDetails:any;
  /**
   * @description loading state of the form
   * @default false
   * @type boolean
   */
  loading: boolean;
  /**
   * @description translations for the form
   * @default {Placeholders:{},Messages:{}}
   * @type object
   */
  translations?: any;
  /**
   * @description show side menu
   * @default false
   * @type boolean
   */
  showSideBar: boolean;
  /**
   * @description side menu content
   * @default null
   * @type any
   * @example <MasterUISideBar show={true}>Side Menu Content</MasterUISideBar>
   */
  sideBarContent?: any;
  /**
   * @description show sub header
   * @default false
   * @type boolean
   * @example <MasterUIFormLayout showSubHeader={true}/>
   */
  showSubHeader?: boolean;
  /**
   * @description comments config
   * @default null
   * @type any
   * @example <MasterUIFormLayout commentsConfig={{}}/>
   */
  commentsConfig?: any;
  showActionBtns: string[];
    /**
   * @description naviagte config
   * @default null
   * @type any
   * @example <MasterUIFormLayout navigate={{}}/>
   */
    navigateTo?: any;
    subHeaderMasterItem?:boolean;
    subHeaderMasterContent?:any;
    showKebabIcon?:boolean
};
export interface Root {
  itemStatus: string | 'ACTIVE';
  lineage: string | '';
  itemSubtypeId: number | 1;
  itemFactValues: ItemFactValue[];
}
export interface ItemFactValue {
  factPguid?: string;
  value: string;
  language?: string;
  updatedByPguid?: string;
}
