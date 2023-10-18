import { useState } from 'react';

import { FieldProps } from '../Form/FormTypes';
import { Box, Autocomplete, Grid, TextField, InputLabel } from '@mui/material';
import { FLAG_CDN_URL_W20, FLAG_CDN_URL_W40 } from '../../utils/Constants/apiConstants';
type MasterUIPhoneNumberProps = {
  fieldProps: FieldProps;
};

type CountryType = {
  code: string;
  name: string;
  label: string;
  suggested?: boolean;
};
const getFlagUrl = (option: CountryType | null) => {
  if (!option) {
    return null;
  }
  return {
    srcSet: `${FLAG_CDN_URL_W40}${option.code.toLowerCase()}.png 2x`,
    src: `${FLAG_CDN_URL_W20}${option.code.toLowerCase()}.png`,
  };
};
/**
 * @description This component can be used when we want a phone number field along with country code.
 * @param {MasterUIPhoneNumberProps} props
 * @returns {ReactNode}
 */
const MasterUIPhoneNumber = (props: MasterUIPhoneNumberProps) => {
  const { fieldProps } = props;
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null,
  );

  return (
    <div>
      <InputLabel>{fieldProps.label?.text}</InputLabel>
      <Grid container>
        <Grid item xs={4}>
          <Autocomplete
            options={fieldProps.options}
            disableClearable
            getOptionLabel={(option) => option.label}
            onChange={(_: any, newValue: CountryType) => {
              setSelectedCountry(newValue);
            }}
            ListboxProps={{
              className: 'scroll-bar-country-code-list',
            }}
            sx={{
              '.MuiAutocomplete-inputRoot': {
                paddingRight: '20px !important',
              },
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { flexShrink: 0 } }}
                {...props}
                key={`${fieldProps.label?.text}${option.label}`}
              >
                <img loading="lazy" width="16" {...getFlagUrl(option)} alt="" />
                {option.label}
              </Box>
            )}
            renderInput={(params) => {
              const flag = getFlagUrl(selectedCountry);
              const inputProps = {
                ...params.InputProps,
                startAdornment: flag ? (
                  <img {...flag} width="16" height="12" />
                ) : null,
              };
              return <TextField {...params} InputProps={inputProps} />;
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            inputMode="numeric"
            fullWidth
            placeholder="XXX XXX XX XX"
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default MasterUIPhoneNumber;
