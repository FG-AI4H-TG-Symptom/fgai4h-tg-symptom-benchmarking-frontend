import { Card, CardContent, TextField, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ProfileInformationSection from './ProfileInformationSection';
import ReactHookFormSelect from './ReactHookFormSelect';
import { getPlainOptions, getSelectOptions } from './utility';
import berlinModelSchema from '../../../data/caseSets/berlinModel.schema.json';

const caseCreatorValidation = {
  required: 'Creator Name is required',
  minLength: {
    value: 6,
    message: 'Creator Name should at least 6 characters',
  },
};

const TopSection: React.FC<any> = ({ case_, possibleConditions }) => {
  const { register, errors } = useFormContext();

  const triageLevels = berlinModelSchema.definitions.expectedTriageLevel.enum;
  const triageOptions = getPlainOptions(triageLevels);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ReactHookFormSelect
                      labelColor={'#1de9b6'}
                      labelFontSize={20}
                      fullWidth
                      id="correctCondition"
                      name={`valuesToPredict.correctCondition.id`}
                      label="Correct Condition"
                      options={getSelectOptions(possibleConditions)}
                      defaultValue={case_?.data.valuesToPredict.correctCondition.id || ''}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      InputLabelProps={{
                        style: { color: '#1de9b6', fontSize: 20 },
                      }}
                      // inputProps={{ style: { fontSize: 40 } }}
                      inputRef={register()}
                      defaultValue={case_?.data?.metaData?.name || ''}
                      name="metaData.name"
                      label="Case Name"
                      type="text"
                      error={Boolean(errors.metaData?.name)}
                      helperText={errors.metaData?.name && errors.metaData.name.message}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs>
                <TextField
                  InputLabelProps={{
                    style: { color: '#1de9b6', fontSize: 20 },
                  }}
                  inputRef={register(caseCreatorValidation)}
                  defaultValue={case_?.data?.metaData?.caseCreator || ''}
                  name="metaData.caseCreator"
                  label="Case creator"
                  type="text"
                  error={Boolean(errors.metaData?.caseCreator)}
                  helperText={errors.metaData?.caseCreator && errors.metaData.caseCreator.message}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={2} direction="column">
              <Grid item xs>
                <ProfileInformationSection case_={case_} />
              </Grid>
              <Grid item xs>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ReactHookFormSelect
                      labelColor={'#1de9b6'}
                      labelFontSize={20}
                      fullWidth
                      id="expectedTriageLevel"
                      name={`valuesToPredict.expectedTriageLevel`}
                      label="Triage Level"
                      options={triageOptions}
                      defaultValue={case_?.data.valuesToPredict.expectedTriageLevel || ''}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ReactHookFormSelect
                      fullWidth
                      labelColor={'#1de9b6'}
                      labelFontSize={20}
                      id="expectedCondition"
                      name={`valuesToPredict.expectedCondition.id`}
                      label="Expected condition"
                      options={getSelectOptions(possibleConditions)}
                      defaultValue={case_?.data.valuesToPredict.expectedCondition.id || ''}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TopSection;
