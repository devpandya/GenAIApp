import { useMemo, useState } from 'react'
import { Grid, Button, Box } from '@mui/material';
import SectionLayout from '../SectionLayout';
import Form from '../Form';
import { FieldProps } from '../Form/FormTypes';
import { generateSectionsLayoutConfiguration } from '../Form/FormFunctions';
import MasterUIFormTable from './MasterUIFormTable';
type InitialSectionProp = {
  key: number,
  value: number,
  initialFields: FieldProps[]
}

type SectionListProps = {
  fieldProp: FieldProps,
  loading: boolean,
  translations: Object | undefined
}

const SectionList = ({
  loading,
  translations,
  fieldProp
}: SectionListProps) => {
  const initialSection = useMemo(() => {
    const relationship = {
      key: 2,
      value: 1
    }
    return generateSectionsLayoutConfiguration([relationship], fieldProp.initialFields)[0];
  }, [])
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false);

  const onAdd = () => {
    setIsAddClicked(true);
  }
  // Add Control
  // List to Render Sections
  return (
    isAddClicked && fieldProp.tableFields ? <MasterUIFormTable fieldProps={fieldProp} /> :
      <SectionForm
        fieldProp={fieldProp}
        initialSection={initialSection}
        loading={loading}
        translations={translations}
        onAdd={onAdd}
      />
  );
}


type SectionFormProps = {
  fieldProp: FieldProps,
  initialSection: InitialSectionProp,
  loading: boolean,
  translations: Object | undefined
  onAdd: Function
}
const SectionForm = ({
  loading,
  translations,
  fieldProp,
  initialSection,
  onAdd
}: SectionFormProps) => {
  return <Box >
    <SectionLayout key={fieldProp.key} title={`${fieldProp.label.text}`} info={fieldProp.label.icon}>
      <Form
        initialFields={initialSection.initialFields}
        loading={loading}
        translations={translations}
        registerClick={() => { }}
      >
        <Grid container key="fields" spacing="20" sx={{ my: 2 }}></Grid>
        <Grid container key="buttons" spacing="0" sx={{ p: 0 }}></Grid>
      </Form>
    </SectionLayout>
    <Grid container justifyContent="flex-end" sx={{ my: 4, p: 0 }} justifyItems="end" >
      <Grid item xs={2}>
        <Button sx={{  float: 'right', p: 0}} >Cancel</Button>
      </Grid>
      <Grid item xs={2}   >
        <Button sx={{ mr: "24px" ,  float: 'right', p: 0}} onClick={() => { onAdd() }}>Add</Button>
      </Grid>
    </Grid>
  </Box>;
}
export default SectionList