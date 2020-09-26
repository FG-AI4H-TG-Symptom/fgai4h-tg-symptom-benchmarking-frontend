import { FieldErrors, Resolver } from 'react-hook-form';
import { ValidateFunction } from 'ajv';

export const errorsInChildren = <FormValuesType>(
  name: string,
  errors: FieldErrors<FormValuesType> | undefined,
): [string, string][] =>
  (errors && (Object.entries(errors) as [string, string][]).filter(([errorPath]) => errorPath.startsWith(name))) || [];

export const errorSummary = (name: string, errors: [string, string][]): string => {
  if (errors.length > 0) {
    let errorSummaryString = errors[0][1];

    let errorPath = errors[0][0];
    if (errorPath.includes(name)) {
      errorPath = errorPath.substring(errorPath.indexOf(name) + name.length);
    }
    errorPath = errorPath.replace(/^\./, '').replace(/\./g, ' › ');
    if (errorPath.length > 0) {
      errorSummaryString = `${errorPath}: ${errorSummaryString}`;
    }

    if (errors.length > 1) {
      errorSummaryString += ` (+ ${errors.length - 1} error${errors.length > 2 ? 's' : ''})`;
    }
    return errorSummaryString;
  }
  return 'No errors';
};

export const sanitizeForId = (prefix: string): string => prefix.replace(/[.[\]'"]/g, '');

export const validateAgainstSchema = <FormValues>(
  values,
  schemaValidator: ValidateFunction,
): ReturnType<Resolver<FormValues>> => {
  const valid = schemaValidator(values);
  if (valid) {
    return { values, errors: {} };
  }

  const errors = {};
  schemaValidator.errors.forEach((error) => {
    // todo: make certain errors more human readable
    errors[error.dataPath.replace(/^\./, '')] = error.message;
  });

  return { values: {}, errors };
};
