import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().email('app.validEmail').required('app.emailRequire'),
  password: yup
    .string()
    .required('app.passwordRequire')
    .min(8, 'app.passwordLenght')
    .matches(/[0-9]/, 'app.passwordRequireNumber')
    .matches(/[a-z]/, 'app.passwordRequireLowercase')
    .matches(/[A-Z]/, 'app.passwordRequireUppercase')
    .matches(/[!@#$%^&*(),.?":{}|<>+=]/, 'app.passwordRequireSpecial'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'app.passwordMustMatch')
    .required('app.confirmPasswordRequired'),
});
