// material-ui
import { Button, Grid, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Form from 'ui-component/Form';
import SectionLayout from 'ui-component/SectionLayout';
import { getGeneratedJSON, getValues, postData } from './service';
import { useCallback } from 'react';

const form = {
  id: 'sample-page',
  title: 'Generated Page',
  loading: false
};

const SamplePage = () => {
  const { id, title, loading } = form;
  const [fields, setFields] = useState([]);
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const Reset = () => {
    setFields([]);
    setList([]);
    setText('');
  };
  const Back = () => {
    setFields([]);
  };

  const updateList = useCallback(async () => {
    const listi = await getValues();
    setList(listi);
    console.log('list', listi);
  }, []);

  const buttons = [
    {
      id: 'submit',
      key: 'submit',
      label: 'Submit',
      type: 'submit',
      variant: 'contained',
      color: 'primary',
      validateFields: true,
      onClick: async (data) => {
        let id = selectedId;
        if (!selectedId) {
          id = list?.length ? list[list.length - 1]?.key + 1 : 1;
        }
        // const postResult = await postData(id, data);
        // if (postResult?.status === 200) {
        //   alert('Data Submitted Successfully');
        //   await updateList();
        // } else {
        //   alert('Data Submission Failed');
        // }

        setList([...list, { key: id, value: data }]);
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

  if (fields?.length) {
    return (
      <>
        <SectionLayout id={id} title={pageTitle}>
          <Form initialFields={fields} loading={loading} buttons={[...buttons, ...localActions]}>
            <Grid container key="fields" spacing="20" sx={{ my: 2 }}></Grid>
            <Grid container key="buttons" spacing="20" gap={2} p={2} sx={{ my: 2 }}></Grid>
          </Form>
        </SectionLayout>

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
      </>
    );
  } else {
    return (
      <Grid container>
        <SectionLayout id={'textArea'} title={'Add comma seperated keywords to generate a form'}>
          <Grid container justifyContent={'flex-end'} p={2} gap={2}>
            <TextField
              type="text"
              multiline
              rows={4}
              fullWidth
              placeholder="Enter comma seperated values"
              value={text}
              onChange={({ target }) => setText(target?.value)}
            />
            <Button
              onClick={async () => {
                if (text?.trim()?.length) {
                  const { locFields, pgTitle } = await getGeneratedJSON(text?.trim());
                  setPageTitle(pgTitle);
                  debugger;
                  setFields(locFields);
                } else {
                  setFields([]);
                }
              }}
            >
              Generate
            </Button>
          </Grid>
        </SectionLayout>
      </Grid>
    );
  }
};

export default SamplePage;
