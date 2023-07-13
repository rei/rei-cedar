import propValidator from '../utils/propValidator';

export default {
  type: String,
  default: 'medium',
  validator: (value: string) => propValidator(
    value,
    ['small', 'medium', 'large'],
  ),
};
