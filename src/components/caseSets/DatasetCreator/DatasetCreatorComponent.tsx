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

// import ErrorIndicator from "../../common/ErrorIndicator";

interface FormData {
  name: string;
}
type RawFormData = {
  [fieldName in keyof FormData]?: string;
};

// const validationResolver = (rawValues: RawFormData) => {
//   const errors: { [fieldName in keyof FormData]?: string } = {};
//   const values: Partial<FormData> = {};

//   // try {
//   //   values.numberOfCases = parseFloat(rawValues.numberOfCases);
//   // } catch (error) {
//   //   errors.numberOfCases = "Not a number";
//   // }

//   // if (values.numberOfCases <= 0) {
//   //   errors.numberOfCases = "Enter a non-zero number of cases";
//   // }
//   // if (values.numberOfCases > 200) {
//   //   errors.numberOfCases = "Please select a number of cases not exceeding 200";
//   // }

//   const valid = Object.keys(errors).length === 0;

//   return valid
//     ? { values: values as FormData, errors: {} }
//     : { values: {}, errors };
// };

interface CaseSetCreatorComponentProps {
  onCreateCaseSet: (caseSetParameters) => void;
}

const DatasetCreatorComponent: React.FC<CaseSetCreatorComponentProps> = ({
  onCreateCaseSet,
}) => {
  const { register, handleSubmit } = useForm({
    // validationResolver: validationResolver as any,
    defaultValues: {
      name: "New Dataset",
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
            <CardHeader
              title="Parameters"
              // action={<ErrorIndicator error={errors.name as any} />}
            />
            <CardContent>
              <TextField
                inputRef={register({ required: true, minLength: 6 })}
                name="name"
                label="Dataset Name"
                type="text"
                // error={Boolean(errors.name)}
                // helperText={errors.name}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box display="flex" marginTop={4}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<StartIcon />}
          type="submit"
        >
          Create dataset
        </Button>
      </Box>
    </form>
  );
};

export default DatasetCreatorComponent;
