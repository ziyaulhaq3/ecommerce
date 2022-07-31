import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({Field})=>(
          <TextField{...Field}fullWidth label={label} required={required}/>
        )}
        control={control}
        name={name}
        defaultValue=""
      />
    </Grid>
  );
}

export default FormInput;