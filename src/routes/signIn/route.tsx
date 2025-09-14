'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { auth } from '../../config/firebase.ts';
import { useActions } from '../../redux/useActions.ts';
import { schema } from '../../yup/yupSignin.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';

interface IFormInput {
  email: string;
  password: string;
}
export default function SignIn() {
  const intl = useIntl();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { login } = useActions();

  function getTranslate(key: string) {
    return <FormattedMessage id={key} />;
  }

  const handleLogin: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      login();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="container">
        <article>
          <h1>
            <FormattedMessage id="app.signInHeader" />
          </h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <label htmlFor="email">
              <FormattedMessage id="app.email" />
            </label>
            <input type="text" {...register('email')} name="email" />
            {errors.email?.message && (
              <p>{getTranslate(errors.email.message)}</p>
            )}
            <label htmlFor="password">
              <FormattedMessage id="app.password" />
            </label>
            <input type="password" {...register('password')} name="password" />
            {errors.password?.message && (
              <p>{getTranslate(errors.password.message)}</p>
            )}
            <input
              type="submit"
              value={intl.formatMessage({
                id: 'app.submit',
              })}
            />
          </form>
        </article>
      </div>
    </main>
  );
}
