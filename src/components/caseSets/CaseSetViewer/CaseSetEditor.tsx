import React from "react";
import { FormContext, useForm, ValidationResolver } from "react-hook-form";
import Ajv from "ajv";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  LinkOff as UnlinkIcon,
  Save as SaveIcon,
} from "@material-ui/icons";

import berlinModelSchema from "../../../data/caseSets/berlinModel.schema.json";
import { CaseSetInfo } from "../../../data/caseSets/caseSetDataType";
import { paths } from "../../../routes";
import AllErrors from "../../forms/AllErrors";
import AutoTextField from "../../forms/AutoTextField";
import { validateAgainstSchema } from "../../forms/utils";
import ConfirmationIconButton from "../../common/ConfirmationIconButton";
import Fab from "../../common/Fab";
import LinkWrapper from "../../common/LinkWrapper";

// we're not editing the cases in this form, so it's easiest to remove them from the schema
delete berlinModelSchema.properties.cases;
berlinModelSchema.required = berlinModelSchema.required.filter(
  (propertyName) => propertyName !== "cases"
);
const caseSetSchemaValidator = new Ajv({
  coerceTypes: true,
  allErrors: true,
}).compile(berlinModelSchema);

const validationResolver: ValidationResolver<CaseSetInfo> = (values) =>
  validateAgainstSchema(values, caseSetSchemaValidator);

export interface CaseSetEditorProps {
  caseSet: CaseSetInfo;
  saveCaseSet: (caseSet: CaseSetInfo) => void;
}

const CaseSetEditor: React.FC<CaseSetEditorProps> = ({
  caseSet,
  saveCaseSet,
}) => {
  const { handleSubmit, errors, ...formMethods } = useForm<CaseSetInfo>({
    defaultValues: caseSet,
    validationResolver,
    validationContext: caseSet,
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormContext handleSubmit={handleSubmit} errors={errors} {...formMethods}>
      <form
        onSubmit={handleSubmit((data) => saveCaseSet({ ...caseSet, ...data }))}
      >
        <Fab label="Save" type="submit">
          <SaveIcon />
        </Fab>

        <Box margin={2}>
          <AllErrors />

          <AutoTextField
            name="name"
            label="Case set name"
            type="text"
            autoComplete="off"
          />
        </Box>

        <List>
          {caseSet.cases.map((item, index) => {
            return (
              <ListItem key={item.id}>
                <ListItemAvatar>
                  <Avatar>{index + 1}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.data.caseData.metaData.description}
                  secondary={
                    <>
                      {item.data.caseData.presentingComplaints[0].name} –{" "}
                      {item.data.valuesToPredict.condition.name}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <>
                    <ConfirmationIconButton
                      onConfirmed={(): void => {
                        // todo: implement deleting cases
                      }}
                      color="darkred"
                      label="Hold to delete case"
                      disabled
                    >
                      <DeleteIcon />
                    </ConfirmationIconButton>
                    <ConfirmationIconButton
                      onConfirmed={(): void => {
                        // todo: implement removing cases from case sets
                      }}
                      color="darkred"
                      label="Hold to remove case from case set"
                      disabled
                    >
                      <UnlinkIcon />
                    </ConfirmationIconButton>
                    <LinkWrapper to={paths.CaseEditor(caseSet.id, item.id)}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </LinkWrapper>
                  </>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <Box padding={2}>
          <Button
            onClick={(): void => {
              // todo: implement adding cases
            }}
            disabled
          >
            Add case
          </Button>
        </Box>
      </form>
    </FormContext>
  );
};

export default CaseSetEditor;
