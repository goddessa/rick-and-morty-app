
import { FieldState, FieldValidator } from 'final-form';
import { VALID } from '.';
import { EMAIL_REGEX } from '../utils/regex';
import copy from '../copy';
import { isNonEmptyString } from '../utils/utils';


const required = (errorMessage?: string) => (value: any) => {
  const returnMessage = errorMessage || copy.requiredField;

  if (
    typeof value === 'undefined' ||
    value === null ||
    (typeof value === 'string' && !isNonEmptyString(value))
  ) {
    // undefined or null values are invalid
    return returnMessage;
  }

  return VALID;
};

export const composeValidators =
  (...validators: FieldValidator<any>[]) =>
  (value: any, allValues: object, meta?: FieldState<any>) =>
    validators.reduce(
      (error, validator) => error || validator?.(value, allValues, meta),
      VALID,
    );

const emailValidation = (errorMsg?: string) => (value: string) => {
  if (!value) return VALID;
  return value && EMAIL_REGEX.test(value)
    ? VALID
    : errorMsg || copy.invalidEmail;
};

export default {
  required,
  emailValidation,
  composeValidators,
};
