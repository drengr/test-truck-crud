
import { alphaNum, alpha, helpers, required } from '@vuelidate/validators';

import { TruckStatus } from './TruckStatus';

const mustBeTruckStatus = (val: any) => Object.values(TruckStatus).includes(val);

export const truckValidationRules = {
  code: {
    required: helpers.withMessage('Required', required),
    alphaNum,
  },
  name: {
    required: helpers.withMessage('Required', required),
    alpha,
  },
  status: {
    required: helpers.withMessage('Required', required),
    mustBeTruckStatus,
  },
};
