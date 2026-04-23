import propValidator from '../utils/propValidator';
import { primarySecondaryOptions } from '../types/other';

export default {
  type: [String],
  default: 'primary',
  validator: (value: string) => propValidator(value, [...primarySecondaryOptions]),
};
