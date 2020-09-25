import { FieldErrors, useFieldArray, useFormContext, ValidationResolver } from 'react-hook-form';
import { ValidateFunction } from 'ajv';

import { usePrefix } from './PrefixContext';

export const useWatch = <WatchedValueType>(path: string): WatchedValueType => {
  const { watch } = useFormContext();
  const prefixedPath = usePrefix() + path;
  return watch(prefixedPath);
};

export const useWatchArrayHelper = <WatchedType>(
  fieldArray: { fields: Array<Record<string, unknown>> },
  path: string,
): Array<WatchedType> => {
  const { watch } = useFormContext();
  const prefixedPath = usePrefix() + path;
  const fieldNames = fieldArray.fields.map((value, index) => prefixedPath.replace('*', index.toString()));
  const watchResultObject = watch(fieldNames);
  return fieldNames.map((name) => watchResultObject[name]) as Array<WatchedType>;
};

export const useAutoFieldArray = ({ name, key }: { name: string; key?: string }) =>
  useFieldArray({
    control: useFormContext().control,
    name: usePrefix() + name,
    keyName: key || 'key',
  });

export const errorsInChildren = <FormValuesType>(
  name: string,
  errors: FieldErrors<FormValuesType> | undefined,
): [string, string][] =>
  (errors && (Object.entries(errors) as [string, string][]).filter(([errorPath]) => errorPath.startsWith(name))) || [];

export const useErrorsInChildren = (name?: string): [string, string][] => {
  const { errors } = useFormContext();
  const prefixedName = (usePrefix() + name).replace(/\.$/, '');
  return errorsInChildren(prefixedName, errors);
};

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
): ReturnType<ValidationResolver<FormValues>> => {
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
