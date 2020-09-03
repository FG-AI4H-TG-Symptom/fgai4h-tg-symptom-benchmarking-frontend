import React from "react";
import { FormContext, useForm } from "react-hook-form";
import { Box, Button } from "@material-ui/core";

import AutoTextField from "../../forms/AutoTextField";

interface AiImplementationFormProps {
  onSubmit: (aiImplementation) => void;
}
const AiImplementationForm: React.FC<AiImplementationFormProps> = ({
  onSubmit,
}) => {
  const methods = useForm<any>({
    // todo: validation based on OpenAPI schema
  });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContext {...methods}>
        <AutoTextField name="name" type="text" label="Name" />
        <AutoTextField name="baseUrl" type="text" label="Base URL" />
        <Box display="flex" justifyContent="flex-end" marginTop={4}>
          <Button color="primary" type="submit">
            Register
          </Button>
        </Box>
      </FormContext>
    </form>
  );
};

export default AiImplementationForm;
