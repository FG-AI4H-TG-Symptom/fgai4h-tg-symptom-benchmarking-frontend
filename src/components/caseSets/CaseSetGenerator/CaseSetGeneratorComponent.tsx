import React from 'react';
import { Box, Button, Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ArrowForward as StartIcon } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

interface FormData {
  numberOfCases: number;
  name: string;
}

interface CaseSetCreatorComponentProps {
  onCreateCaseSet: (caseSetParameters) => void;
}

const CaseSetGeneratorComponent: React.FC<CaseSetCreatorComponentProps> = ({ onCreateCaseSet }) => {
  const { register, handleSubmit, errors } = useForm<FormData>({
    defaultValues: {
      numberOfCases: 10,
    },
  });

  const onSubmit = (data) => {
    onCreateCaseSet({
      numberOfCases: data.numberOfCases,
      name: data.name,
    });
  };

  const nameValidation = {
    required: 'Name is required',
    minLength: {
      value: 4,
      message: 'Should be at least 4 characters',
    },
    maxLength: {
      value: 200,
      message: 'Should not exceed 200 characters',
    },
  };

  const numberOfCasesValidation = {
    required: 'Please enter number of cases',
    min: {
      value: 1,
      message: 'Needs to be at least one case',
    },
    max: {
      value: 10000,
      message: 'Should not exceed 10000 cases',
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card style={{ maxWidth: '40rem' }}>
        <CardHeader title="Parameters" />
        <CardContent>
          <TextField
            inputRef={register(nameValidation)}
            name="name"
            label="Name"
            type="string"
            placeholder="Enter Case Set Name"
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name && errors.name.message}
          />

          <Box mt={2}>
            <TextField
              inputRef={register(numberOfCasesValidation)}
              name="numberOfCases"
              label="Number of cases"
              type="number"
              error={Boolean(errors.numberOfCases)}
              helperText={errors.numberOfCases && errors.numberOfCases.message}
              fullWidth
            />
          </Box>

          <Box display="flex" justifyContent="flex-end" marginTop={4}>
            <Button variant="contained" color="primary" endIcon={<StartIcon />} type="submit">
              Generate case set
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export default CaseSetGeneratorComponent;
