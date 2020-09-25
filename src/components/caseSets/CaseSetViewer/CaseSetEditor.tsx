import React from 'react';
import { FormProvider, useForm, Resolver } from 'react-hook-form';
import Ajv from 'ajv';
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
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, LinkOff as UnlinkIcon, Save as SaveIcon } from '@material-ui/icons';

import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';
import { CaseSetInfo } from '../../../data/caseSets/caseSetDataType';
import { paths } from '../../../routes';
import AllErrors from '../../forms/AllErrors';
import { validateAgainstSchema } from '../../forms/utils';
import ConfirmationIconButton from '../../common/ConfirmationIconButton';
import Fab from '../../common/Fab';
import LinkWrapper from '../../common/LinkWrapper';

// we're not editing the cases in this form, so it's easiest to remove them from the schema
delete berlinModelSchema.properties.cases;
berlinModelSchema.required = berlinModelSchema.required.filter((propertyName) => propertyName !== 'cases');
const caseSetSchemaValidator = new Ajv({
  coerceTypes: true,
  allErrors: true,
}).compile(berlinModelSchema);

const validationResolver: Resolver<CaseSetInfo> = (values) => validateAgainstSchema(values, caseSetSchemaValidator);

export interface CaseSetEditorProps {
  caseSet: any;
  saveCaseSet: (caseSet: CaseSetInfo) => void;
  deleteCase: any;
}

const CaseSetEditor: React.FC<CaseSetEditorProps> = ({ caseSet, saveCaseSet, deleteCase }) => {
  const { handleSubmit, errors, ...formMethods } = useForm<CaseSetInfo>({
    defaultValues: caseSet,
    resolver: validationResolver,
    context: caseSet,
  });

  return (
    <FormProvider handleSubmit={handleSubmit} errors={errors} {...formMethods}>
      <form onSubmit={handleSubmit((data) => saveCaseSet({ ...caseSet, ...data }))}>
        <Fab label="Save" type="submit">
          <SaveIcon />
        </Fab>

        <Box margin={2}>
          <AllErrors />

          {/* <AutoTextField name="name" label="Case set name" type="text" autoComplete="off" /> */}
        </Box>

        <List>
          {caseSet.cases.map((case_, index) => {
            return (
              <ListItem key={case_.id}>
                <ListItemAvatar>
                  <Avatar>{index + 1}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={case_.data.metaData.name}
                  secondary={
                    <>
                      {case_.data.caseData.presentingComplaints[0].name} –{' '}
                      {case_.data.valuesToPredict.correctCondition.name}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <>
                    <ConfirmationIconButton
                      onConfirmed={(): void => {
                        deleteCase(case_);
                      }}
                      color="darkred"
                      label="Hold to delete case"
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

                    <LinkWrapper to={paths.simpleCaseEditor(caseSet.id, case_.id)}>
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
          <LinkWrapper to={paths.simpleCaseEditor(caseSet.id, 'new')}>
            <Button>Add case</Button>
          </LinkWrapper>
        </Box>
      </form>
    </FormProvider>
  );
};

export default CaseSetEditor;
