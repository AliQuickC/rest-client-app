'use client';
import './signUp.sass';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { auth } from '../../config/firebase.ts';
import { useActions } from '../../redux/useActions.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../yup/yup.ts';
import { useState } from 'react';
import {
  getPasswordStrength,
  type passwordStrInterface,
} from '../../components/passwordStr/passwordStr.ts';
import { useNavigate } from 'react-router';
import { FormattedMessage, useIntl } from 'react-intl';

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}
export default function SignUp() {
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
  const [passwordStr, setPasswordStr] = useState<passwordStrInterface>({
    score: 0,
    level: 'empty',
    color: 'red',
  });
  const handleSignIn: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      login();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  function getTranslate(key: string) {
    return <FormattedMessage id={key} />;
  }

  return (
    <main>
      <div className="container">
        <article>
          <h1>
            <FormattedMessage id={'app.signUpHeader'} />
          </h1>
          <form onSubmit={handleSubmit(handleSignIn)} className="form">
            <label htmlFor="email">
              <FormattedMessage id={'app.email'} />
            </label>
            <input
              placeholder={intl.formatMessage({ id: 'app.emailPlaceholder' })}
              type="text"
              {...register('email')}
              required
              name="email"
            />
            {errors.email?.message && (
              <p>{getTranslate(errors.email.message)}</p>
            )}
            <label htmlFor="password">
              <FormattedMessage id={'app.password'} />
            </label>
            <input
              placeholder={intl.formatMessage({
                id: 'app.passwordPlaceholder',
              })}
              type="password"
              {...register('password', {
                onChange: (e) => {
                  setPasswordStr(getPasswordStrength(e.target.value));
                },
              })}
              name="password"
              required
            />
            {errors.password?.message && (
              <p>{getTranslate(errors.password.message)}</p>
            )}
            <div
              className="strength-container"
              style={{
                width: `100px`,
                height: '10px',
              }}
            >
              <div
                className="strength-bar"
                style={{
                  width: `100px`,
                  height: '10px',
                }}
              >
                <div
                  className="strength-fill"
                  style={{
                    width: `${(passwordStr.score / 5) * 100}%`,
                    height: '10px',
                    backgroundColor: passwordStr.color,
                  }}
                ></div>
              </div>
            </div>
            <label htmlFor="confirmPassword">
              <FormattedMessage id={'app.confirmPassword'} />
            </label>
            <input
              placeholder={intl.formatMessage({
                id: 'app.confirmPasswordPlaceholder',
              })}
              type="password"
              {...register('confirmPassword')}
              required
              name="confirmPassword"
            />
            {errors.confirmPassword?.message && (
              <p>{getTranslate(errors.confirmPassword.message)}</p>
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
