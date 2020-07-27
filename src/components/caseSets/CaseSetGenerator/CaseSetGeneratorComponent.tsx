import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import { ArrowForward as StartIcon } from "@material-ui/icons";
import { useForm } from "react-hook-form";

import ErrorIndicator from "../../common/ErrorIndicator";

interface FormData {
  numberOfCases: number;
}
type RawFormData = {
  [fieldName in keyof FormData]?: string;
};

const validationResolver = (rawValues: RawFormData) => {
  const errors: { [fieldName in keyof FormData]?: string } = {};
  const values: Partial<FormData> = {};

  try {
    values.numberOfCases = parseFloat(rawValues.numberOfCases);
  } catch (error) {
    errors.numberOfCases = "Not a number";
  }

  if (values.numberOfCases <= 0) {
    errors.numberOfCases = "Enter a non-zero number of cases";
  }
  if (values.numberOfCases > 200) {
    errors.numberOfCases = "Please select a number of cases not exceeding 200";
  }

  const valid = Object.keys(errors).length === 0;

  return valid
    ? { values: values as FormData, errors: {} }
    : { values: {}, errors };
};

interface CaseSetCreatorComponentProps {
  onCreateCaseSet: (caseSetParameters) => void;
}

const CaseSetGeneratorComponent: React.FC<CaseSetCreatorComponentProps> = ({
  onCreateCaseSet,
}) => {
  const { register, handleSubmit, errors } = useForm<FormData>({
    validationResolver: validationResolver as any,
    defaultValues: {
      numberOfCases: 10,
    },
  });

  const onSubmit = ({ numberOfCases }: FormData): void => {
    onCreateCaseSet({
      numberOfCases,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Basic parameters"
              action={<ErrorIndicator error={errors.numberOfCases as any} />}
            />
            <CardContent>
              <TextField
                inputRef={register}
                name="numberOfCases"
                label="Number of cases"
                type="number"
                error={Boolean(errors.numberOfCases)}
                helperText={errors.numberOfCases}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" marginTop={4}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<StartIcon />}
          type="submit"
        >
          Generate case set
        </Button>
      </Box>
    </form>
  );
};

export default CaseSetGeneratorComponent;
