import propValidator from '../utils/propValidator';

export default {
  type: [String],
  default: 'primary',
  validator: (value: string) => propValidator(value, ['primary', 'secondary']),
};
