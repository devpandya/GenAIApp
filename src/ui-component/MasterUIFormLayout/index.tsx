import React, { useCallback, useEffect, useMemo, useState , useRef} from 'react';
import { Grid, Button } from '@mui/material';
import FixedFooter from '../FixedFooter';
import SubHeader, { MasterSubHeader } from '../SubHeader';
import Comments from '../../modules/comments/components';
import { Placeholders, Messages } from '../../utils/Constants/translations';
import {
  fetchMasterFacts
} from '../../modules/Metadata/Services/Metadata';
import {
  generateAccordionData,
  generateSectionsLayoutConfiguration,
  generateTabData,
} from '../Form/FormFunctions';
import SideBarAccordion from '../SideBarAccordion';
import { MasterUIFormLayoutProps } from './MasterUIFormLayoutTypes';
import MasterUISection from './MasterUISection';
import MasterUISideBar from './MasterUISideBar';
import actionButtons from '../../modules/Masters/Actions/ActionList';
import { useContainerStore } from '../../store/containerStore';
import * as Constants from '../../modules/Masters/ActionsModal/Constants';
import { START, MIDDLE, END} from '../../utils/Constants/appConstants';

type ModalDataType = {
  id?:string, 
  onClick?:Function
  data?:string
}

/**
 * Form Layout for Master UI
 * @param config
 * @returns
 */
const MasterUIFormLayout = ({
  config,
  loading,
  translations,
  showSideBar,
  sideBarContent,
  showSubHeader,
  commentsConfig,
  showActionBtns,
  navigateTo,
  subHeaderMasterContent,
  showKebabIcon
}: MasterUIFormLayoutProps) => {
let taskId: string | undefined, currentEntityId: string | undefined, setEntityData: Function | undefined, 
navigate: Function | undefined, userDetails:any, userName: Function | undefined,userId: Function | undefined,assignee: Function | undefined
const { masters, relationShips } = config;
if (config && config.otherDetails && config.otherDetails.taskDetails) {
  ({ taskId, userName, userId, assignee } = config.otherDetails.taskDetails);
}

if (config && config.otherDetails) {
  ({ currentEntityId, setEntityData, navigate, userDetails } = config.otherDetails);
}

  const clcikRef = React.useRef<any>([]);
  const resetHandlerRef = React.useRef<any>([]);
  const [postData, setPostData] = React.useState({});
  const postRef = React.useRef<any>({});
  const [textTranslations, setTextTranslations] = React.useState<any>({
    placeholders: Placeholders,
    messages: Messages,
  });
  const [openComments, setOpenComments] = React.useState(false);
  const [accordionData, setAccordionData] = useState<any>();
  const [selectedMaster, setSelectedMaster] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const selectedMasterRef =  useRef(selectedMaster);
  const [sections, setSections] = useState<any>();
  const [actions, setActions] = useState(config.actions);
  const [modalData, setModalData] = useState<ModalDataType>({});
  const userInfo  = useContainerStore((state) => state.userInfo);
 const ssoUser = userInfo?.ssoUser;
  const {
    ANALYST,
    FORM_ACTION_REJECT,
    FORM_ACTION_ESCALATE,
    FORM_ACTION_DELETE,
    FORM_ACTION_PUBLISH
} = Constants;

  useEffect(() => {
    if (masters?.length > 0) {
      (async () => {
        const tabData = await generateTabData(masters);
        const accordionData = generateAccordionData(tabData);
        setAccordionData(accordionData);
        if(accordionData?.length > 0){
          setSelectedMaster(accordionData[0]);
          setSelectedItem(accordionData[0]?.content[0]?.key);
        }
        
      })();
    }
  }, [masters]);

  useEffect(() => {
    setActions([...actions, ...actionButtons]);
  }, []);

  useEffect(()=>{
    selectedMasterRef.current = selectedMaster;
  },[selectedMaster])


  useEffect(() => {
    if (selectedMaster) {
      if (config?.sections) {
        const sec = generateSectionsLayoutConfiguration(
          selectedMaster.content,
          config?.sections,
          relationShips
        );
        setSections(sec);
      } else {
        (async () => {
          const result = await fetchMasterFacts(
            selectedMaster?.api,
            selectedMaster?.key,
          );
          if (result?.length > 0) {
            const sec = generateSectionsLayoutConfiguration(
              selectedMaster.content,
              result,
              relationShips
            );
            setSections(sec);
          }
        })();
      }
    }
  }, [selectedMaster]);

  useEffect(() => {
    if (translations) {
      setTextTranslations((prevData: any) => {
        let newTranslations = { ...prevData };
        newTranslations.placeholders = {
          ...newTranslations.placeholders,
          ...translations.placeholders,
        };
        newTranslations.messages = {
          ...newTranslations.messages,
          ...translations.messages,
        };
        return newTranslations;
      });
    }
  }, [translations]);

  const sideMenuContent = useMemo(() => {
    if (accordionData?.length > 0) {
      return (
        <SideBarAccordion
          getActiveItem={(item)=>{
            setSelectedItem(item);
            const section= document.getElementById(item.key);
            section?.scrollIntoView();
       }}
          getActiveTab={(active)=>{setSelectedMaster(active)}}
          data={accordionData}
          selectedTab={selectedMaster}
          selectedItem= {selectedItem}
        />
      );
    }
    return null;
  }, [accordionData,setSelectedMaster,selectedMaster]);

  /**
   * @description register click event for each section
   * @param section
   * @param onClick
   * @returns void
   */
  const registerClick = (section: string, onClick: any) => {
    clcikRef.current.push({ key: section, onClick: onClick });
  };

  /**
   * @description generate post data for each section and set it to postRef
   * @param section
   * @param data
   * @returns void
   */
  const generatePostData = async (section: string, data: any) => {
    setPostData((prevData) => {
      postRef.current = { ...prevData, [section]: data };
      return { ...prevData, [section]: data };
    });
  };

  /**
   * @description execute all sections and generate a collection of post data
   * @param shouldValidate
   * @param exectuteClick
   * @returns void
   */
  const executeAllSections = useCallback(
    async (actionObj:any) => {
      const {shouldValidate,modalComponent,id,onClick } =actionObj
          await clcikRef.current.forEach(async (action: any) => {
        await action?.onClick(
          shouldValidate,
          async (data: any) => await generatePostData(action.key, data),
        );
      });
      //-for Developer Reference
      console.log(JSON.stringify(postRef.current));
      if(modalComponent) {
        setModalData({id:id, onClick:onClick, data: postRef.current})
      } else {
        //-for Developer Reference
      actionObj.onClick(postRef.current, {selectedMasterRef, navigateTo});
      }
      
    },
    [postData],
  );

  const closeHandler = () => {
    setModalData({})
  }

  let companyValue={};
  const saveHandler =(reason:'', otherReason:'') =>{
    if(typeof modalData?.onClick === 'function'){
      modalData.onClick(modalData.data, {selectedMasterRef, userDetails, reason, otherReason, taskId, companyValue,currentEntityId, navigate,resetForm, setEntityData, userName, userId, assignee, ssoUser});
    }
    setModalData({});
  }

  const resetSectionHandler = (resetCallback:any) => {
    resetHandlerRef.current.push(resetCallback);
  }

  const resetForm = ()=>{
   if(Array.isArray(resetHandlerRef.current)){
    resetHandlerRef.current.forEach(handler=>{
      handler();
    });
   } 
  }
  const handleDisable = (buttonName:string) => {
   const userRole=userInfo?.selectedRole?.role;
    if (
      userRole === ANALYST &&
      (buttonName === FORM_ACTION_REJECT ||
        buttonName === FORM_ACTION_DELETE ||
        buttonName === FORM_ACTION_PUBLISH)
      ) {
      return true;
    }
    if (buttonName === FORM_ACTION_ESCALATE){
      return false;
    }
  };
  /**
   * @description render button based upon config actions
   * @param action
   * @returns An Element or a Action Button
   */
  const renderButton = (action: any) => {
    if (action?.element) {
      return action?.element;
    }
    return (
      <>
      <Button sx={{ mr: "10px"}}
        id={action.key}
        onClick={(e) => 
          executeAllSections(action)
        }
        disabled={loading || action.disabled || handleDisable(action.label)}
        color={action.color}
        variant={action.variant}
      >
        {action.label}
      </Button>
      {action?.modalComponent && action?.id === modalData?.id ? 
      <action.modalComponent 
        open={true} 
        popupName={action?.popupName}
        role={userInfo?.selectedRole?.role}
        onHandleClose={closeHandler}  
        onSave={saveHandler}
        onReset={resetSectionHandler}
        entityName={selectedMasterRef.current?.key}
        /> : null }
      </>
    );
  };
  
  const positions = [START, MIDDLE, END];
  const filterdActions = actions.filter((action: any)=> !showActionBtns || showActionBtns.includes(action.label)).map((action: any)=>({...action, position: action.position || 'end'}))
  return (
    <Grid>
      <SubHeader showSubHeader={showSubHeader || false}>
        <MasterSubHeader
          showCommentIcon={commentsConfig?.show}
          subHeaderMasterContent={subHeaderMasterContent}
          showKebabIcon={showKebabIcon}
          onCommentIconClick={() => setOpenComments(!openComments)}
          {...commentsConfig}
        />
      </SubHeader>
      <Grid container justifyContent={'center'}>
        <MasterUISideBar show={showSideBar} showSubHeader={showSubHeader}>
          {sideBarContent || sideMenuContent}
        </MasterUISideBar>
        <Grid
          item
          sx={{
            marginLeft:'20%',
            width: '48%',
            marginRight: openComments ? '15%' : '0',
            marginTop: showSubHeader ? '100px' : '0',
          }}
        >
          {sections?.map((section: any) => {
            return (
              <MasterUISection
                onReset={resetSectionHandler}
                key={section.key}
                id={section.key}
                selectedItem={selectedItem}
                onSectionToggleHandler={(item:number)=>{
                  setSelectedItem(item===selectedItem ? '' : item);
                }}
                title={section.title}
                initialFields={section.initialFields}
                info={section.info}
                registerClick={(clicked: any) =>
                  registerClick(section.key, clicked)
                }
                loading={loading}
                translations={textTranslations}
              />
            );
          })}
        </Grid>
      </Grid>
      <Comments
        openCommentsUI={openComments}
        handleCommentsUI={() => setOpenComments(false)}
        {...commentsConfig}
      />
      <FixedFooter id="masterLayoutFooter">
       {positions.map(position => (
           <Grid key={position} id={position}>
           {filterdActions?.filter( (action: any) =>(action.position === position) )?.map(renderButton)}
         </Grid>
       ))}
      </FixedFooter>
    </Grid>
  );
};

export default MasterUIFormLayout;