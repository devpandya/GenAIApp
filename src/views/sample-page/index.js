// material-ui
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Form from 'ui-component/Form';
import SectionLayout from 'ui-component/SectionLayout';
import { generateCodeFromChatGPT, getGeneratedJSON, getValues, postData } from './service';
import { useCallback } from 'react';
import { set } from 'immutable';
import { useRef } from 'react';
import FixedFooter from 'ui-component/FixedFooter';

const form = {
  id: 'sample-page',
  title: 'Generated Page',
  loading: false
};

const SamplePage = () => {
  const { id, title } = form;
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [sections, setSections] = useState([]);
  const [postData, setPostData] = useState({});
  const postRef = useRef({});
  const Reset = () => {
    setFields([]);
    setList([]);
    setText('');
  };

  const clcikRef = useRef([]);

  const registerClick = (section, onClick) => {
    clcikRef.current.push({ key: section, onClick: onClick });
  };

  const generatePostData = async (section, data) => {
    setPostData((prevData) => {
      postRef.current = { ...prevData, [section]: data };
      return { ...prevData, [section]: data };
    });
  };

  const generateCode = async () => {
    const resp = await generateCodeFromChatGPT(text);
    setFields(resp);
  };
  const Back = () => {
    setFields([]);
  };

  const updateList = useCallback(async () => {
    const listi = await getValues();
    setList(listi);
    console.log('list', listi);
  }, []);

  const executeAllSections = useCallback(
    async (actionObj) => {
      const { shouldValidate, id, onClick } = actionObj;
      debugger;
      await clcikRef.current.forEach(async (action) => {
        debugger;
        await action?.onClick(shouldValidate, async (data) => await generatePostData(action.key, data));
      });
      //-for Developer Reference
      console.log(JSON.stringify(postRef.current));
      //-for Developer Reference
      debugger;
      actionObj.onClick(postRef.current);
    },
    [postData]
  );

  const buttons = [
    {
      id: 'submit',
      key: 'submit',
      label: 'Submit',
      type: 'submit',
      variant: 'contained',
      color: 'primary',
      validateFields: true,
      shouldValidate: true,
      onClick: async (data) => {
        debugger;
        let id = selectedId;
        if (!selectedId) {
          id = list?.length ? list[list.length - 1]?.key + 1 : 1;
        }
        debugger;
        let flat = {};
        const flatObject = Object.keys(data).forEach((key) => {
          flat = { ...flat, ...data[key] };
        });
        debugger;
        const newList = [...list, { key: id++, value: flat }];
        debugger;
        setList(newList);
        setFields([...fields]);
      }
    }
  ];

  const localActions = [
    {
      id: 'back',
      key: 'back',
      label: 'Back',
      variant: 'contained',
      color: 'secondary',
      onClick: (postData) => {
        Back();
      }
    },
    {
      id: 'reset',
      key: 'reset',
      label: 'Reset',
      variant: 'contained',
      color: 'secondary',

      onClick: (postData) => {
        Reset();
      }
    }
  ];
  const renderButton = (action) => {
    if (action?.element) {
      return action?.element;
    }
    return (
      <>
        <Button
          sx={{ mr: '10px' }}
          id={action.key}
          onClick={(e) => executeAllSections(action)}
          disabled={loading || action?.disabled}
          color={action.color}
          variant={action.variant}
        >
          {action.label}
        </Button>
        {action?.modalComponent && action?.id === modalData?.id ? (
          <action.modalComponent
            open={true}
            popupName={action?.popupName}
            role={userInfo?.selectedRole?.role}
            onHandleClose={closeHandler}
            onSave={saveHandler}
            onReset={resetSectionHandler}
            entityName={selectedMasterRef.current?.key}
          />
        ) : null}
      </>
    );
  };
  if (fields?.length) {
    return (
      <Grid container flexDirection={'column'} sx={{ width: '50%', margin: 'auto' }}>
        {sections?.length ? (
          sections.map((section) => {
            return (
              <SectionLayout id={section?.id} title={section?.title}>
                <Form
                  registerClick={(onClick) => registerClick(section?.id, onClick)}
                  initialFields={section.fields}
                  loading={loading}
                  buttons={[]}
                >
                  <Grid container key="fields" spacing="20" sx={{ my: 2 }}></Grid>
                  <Grid container key="buttons" spacing="20" gap={2} p={2} sx={{ my: 2 }}></Grid>
                </Form>
              </SectionLayout>
            );
          })
        ) : (
          <SectionLayout id={id} title={pageTitle}>
            <Form initialFields={fields} loading={loading} buttons={[]} registerClick={(onClick) => registerClick('single', onClick)}>
              <Grid container key="fields" spacing="20" sx={{ my: 2 }}></Grid>
              <Grid container key="buttons" spacing="20" gap={2} p={2} sx={{ my: 2 }}></Grid>
            </Form>
          </SectionLayout>
        )}
        <FixedFooter id="masterLayoutFooter">
          <Grid container justifyContent={'flex-end'}>
            {buttons?.map(renderButton)}
            {localActions?.map(renderButton)}
          </Grid>
        </FixedFooter>
        {list.length ? (
          <Grid
            container
            flexDirection={'column'}
            justifyContent={'flex-end'}
            p={2}
            gap={2}
            pb={3}
            sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
          >
            <Grid container justifyContent={'space-between'} p={2} gap={2}>
              {list?.length &&
                Object.keys(list[0]?.value)?.map((key) => {
                  return (
                    <Grid
                      key={key}
                      width={`${parseInt(100 / Object.keys(list[0]?.value).length) - 2}%`}
                      sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '10px'
                      }}
                    >
                      {key}
                    </Grid>
                  );
                })}
            </Grid>
            <Grid item sx={{ borderBottom: '1px solid #dedede' }}></Grid>
            {list?.map((item, index) => {
              // make row based upon item fields
              return (
                <Grid container key={item?.id} justifyContent={'space-between'} p={2} gap={2} sx={{ borderBottom: '1px solid #dedede' }}>
                  {Object.keys(item?.value).map((key) => {
                    return (
                      <Grid
                        key={key}
                        width={`${parseInt(100 / Object.keys(item?.value).length) - 2}%`}
                        onClick={() => setSelectedId(item?.key)}
                        sx={{ cursor: 'pointer' }}
                        style={{ backgroundColor: selectedId === item?.key ? 'lightblue' : 'white', textAlign: 'center', fontSize: '10px' }}
                      >
                        {item?.value[key]}
                      </Grid>
                    );
                  })}
                </Grid>
              );
            })}
          </Grid>
        ) : null}
      </Grid>
    );
  } else {
    return (
      <Grid container>
        <SectionLayout id={'textArea'} title={'Paste fields from excel to generate a form'}>
          <Grid container justifyContent={'flex-end'} p={2} gap={2}>
            <TextField
              type="text"
              multiline
              rows={4}
              fullWidth
              placeholder="Paste fields"
              value={text}
              onChange={({ target }) => setText(target?.value)}
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={async () => {
                  if (text?.trim()?.length) {
                    setLoading(true);
                    const { section, locFields, pgTitle } = await getGeneratedJSON(text?.trim(), setLoading);
                    setPageTitle(pgTitle);
                    setFields(locFields);
                    setSections(section);
                    setLoading((prev) => !prev);
                  } else {
                    setFields([]);
                    setSections([]);
                  }
                }}
              >
                Generate
              </Button>
            )}
          </Grid>
        </SectionLayout>
      </Grid>
    );
  }
};

export default SamplePage;
