import React from 'react'
import {Grid} from '@mui/material';
import { MasterUISectionProps } from './MasterUIFormLayoutTypes';
import SectionLayout from '../SectionLayout';
import Form from '../Form';

const MasterUISection = ({
  id,
  title,
  initialFields,
  info,
  registerClick,
  loading,
  translations,
  onReset,
  selectedItem,
  onSectionToggleHandler
}: MasterUISectionProps) => {
  return (
    <SectionLayout id={id} title={title} info={info} selectedItem={selectedItem} onSectionToggleHandler={onSectionToggleHandler}>
      <Form
        initialFields={initialFields}
        registerClick={(onClick: any) => registerClick(onClick)}
        loading={loading}
        translations={translations}
        onReset={onReset}
      >
        <Grid container key="fields" spacing="20" sx={{ my: 2 }}></Grid>
        <Grid container key="buttons" spacing="20" sx={{ my: 2 }}></Grid>
      </Form>
    </SectionLayout>
  );
};

export default MasterUISection