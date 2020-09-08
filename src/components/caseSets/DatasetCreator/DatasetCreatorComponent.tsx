import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, Grid, TextField } from '@material-ui/core';
import { ArrowForward as StartIcon } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

interface CaseSetCreatorComponentProps {
  onCreateCaseSet: (caseSetParameters) => void;
}

const DatasetCreatorComponent: React.FC<CaseSetCreatorComponentProps> = ({ onCreateCaseSet }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: 'New Dataset',
    },
  });

  const onSubmit = (data) => {
    onCreateCaseSet(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Parameters" />
            <CardContent>
              <TextField
                inputRef={register({
                  required: 'Name is required',
                  minLength: {
                    value: 6,
                    message: 'Name should be longer than 6 characters',
                  },
                })}
                name="name"
                label="Dataset Name"
                type="text"
                error={Boolean(errors.name)}
                helperText={errors.name && errors.name.message}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box display="flex" marginTop={4}>
        <Button variant="contained" color="primary" endIcon={<StartIcon />} type="submit">
          Create dataset
        </Button>
      </Box>
    </form>
  );
};

export default DatasetCreatorComponent;
