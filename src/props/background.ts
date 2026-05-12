import propValidator from '../utils/propValidator';
import { primarySecondaryOptions } from '../types/componentOptions';

export default {
  type: [String],
  default: 'primary',
  validator: (value: string) => propValidator(value, [...primarySecondaryOptions]),
};
