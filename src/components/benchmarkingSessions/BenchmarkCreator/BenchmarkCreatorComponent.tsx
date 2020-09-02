import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { ArrowForward as StartIcon } from "@material-ui/icons";
import { useForm, ValidationResolver } from "react-hook-form";

import ErrorIndicator from "../../common/ErrorIndicator";
import formatDate from "../../../util/formatDate";

interface FormData {
  aiImplementations: boolean[];
  caseSetId: string;
}

const validationResolver: ValidationResolver<FormData> = (values) => {
  const errors = {};
  if (!values.caseSetId) {
    // eslint-disable-next-line dot-notation
    errors["caseSetId"] = "Select a case set";
  }
  if (!values.aiImplementations.some((aiImplementation) => aiImplementation)) {
    // eslint-disable-next-line dot-notation
    errors["aiImplementations"] = "Select at least one AI implementation";
  }
  const valid = Object.keys(errors).length === 0;
  return { values: valid ? values : {}, errors: valid ? {} : errors };
};

const BenchmarkCreatorComponent: React.FC<any> = ({
  aiImplementations,
  caseSetList,
  defaultCaseSetId,
  onCreateBenchmark,
}) => {
  const { register, handleSubmit, errors, watch } = useForm<FormData>({
    validationResolver,
    defaultValues: {
      aiImplementations: Object.keys(aiImplementations).map(() => true),
      caseSetId: defaultCaseSetId,
    },
  });

  const onSubmit = ({
    caseSetId,
    aiImplementations: selectedAiImplementations,
  }: FormData): void => {
    onCreateBenchmark({
      caseSetId,
      aiImplementationIds: aiImplementations
        .filter((_, index) => selectedAiImplementations[index])
        .map(({ id }) => id),
    });
  };

  const aiImplementationsSelectedCount = watch("aiImplementations")?.filter(
    (x) => x
  ).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Case set"
              subheader={`${caseSetList.length} available`}
              action={<ErrorIndicator error={errors.caseSetId as any} />}
            />
            <CardContent>
              <FormControl
                component="fieldset"
                error={Boolean(errors.caseSetId)}
              >
                <RadioGroup
                  aria-label="case set"
                  defaultValue={defaultCaseSetId}
                >
                  {caseSetList.map(({ id, name, createdOn }) => {
                    const date = new Date(createdOn);

                    return (
                      <FormControlLabel
                        style={{ marginBottom: "20px" }}
                        key={id}
                        value={id}
                        control={<Radio name="caseSetId" inputRef={register} />}
                        label={
                          <div>
                            <Typography variant="subtitle1">{name}</Typography>
                            <Typography variant="caption" color="secondary">
                              {formatDate(date)}
                            </Typography>
                          </div>
                        }
                      />
                    );
                  })}
                </RadioGroup>
                <FormHelperText>Select exactly one</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="AI implementations"
              subheader={`${aiImplementationsSelectedCount} selected, ${aiImplementations.length} available`}
              action={
                <ErrorIndicator error={errors.aiImplementations as any} />
              }
            />
            <CardContent>
              <FormControl
                component="fieldset"
                error={Boolean(errors.aiImplementations)}
              >
                <FormGroup>
                  {aiImplementations.map(({ id, name }, index) => (
                    <FormControlLabel
                      key={id}
                      control={<Checkbox defaultChecked />}
                      label={name}
                      name={`aiImplementations[${index}]`}
                      inputRef={register}
                    />
                  ))}
                </FormGroup>
                <FormHelperText>Select at least one</FormHelperText>
              </FormControl>
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
          Create benchmark
        </Button>
      </Box>
    </form>
  );
};

export default BenchmarkCreatorComponent;
