import generalValidations from './general';
import auth from './auth';

export const VALID: any = undefined;

export default {
  ...generalValidations,
  ...auth,
};
