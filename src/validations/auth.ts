

import copy from '../copy';
import { VALID } from '.';
import { PASSWORD_REGEX } from '../utils/regex';

const passwordValidate = (errorMsg?: string) => (value: string) => {
  if (!value) return VALID;
  return value && PASSWORD_REGEX.test(value)
    ? VALID
    : errorMsg || copy.invalidPassword;
};

const fieldEqualValues =
  (compareFieldName: string, errorMsg?: string) =>
  (value: string, allValues?: any) => {
    const compareValue = allValues?.[compareFieldName];
    return value === compareValue
      ? VALID
      : errorMsg || copy.fieldsAreNotEqual;
};
const firebaseErrorMatches = (error: unknown, code: string): boolean => {
  const message =
    (error as any)?.message || (error as any)?.toString?.() || "";
  return message.includes(code);
};
export default { passwordValidate, fieldEqualValues, firebaseErrorMatches};
