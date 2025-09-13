'use client';
import './login.sass';
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
export default function Login() {
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
          <p>
            <FormattedMessage id={'app.signUpDescription'} />
          </p>
          <form onSubmit={handleSubmit(handleSignIn)} className="form">
            <label>
              <FormattedMessage id={'app.email'} />
            </label>
            <input
              placeholder={intl.formatMessage({ id: 'app.emailPlaceholder' })}
              type="text"
              {...register('email')}
              required
            />
            <p>
              {' '}
              {errors.email?.message
                ? getTranslate(errors.email?.message)
                : null}
            </p>
            <label>
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
              required
            />
            <p>
              {errors.password?.message
                ? getTranslate(errors.password?.message)
                : null}
            </p>
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
            <label>
              <FormattedMessage id={'app.confirmPassword'} />
            </label>
            <input
              placeholder={intl.formatMessage({
                id: 'app.confirmPasswordPlaceholder',
              })}
              type="password"
              {...register('confirmPassword')}
              required
            />
            <p>
              {' '}
              {errors.confirmPassword?.message
                ? getTranslate(errors.confirmPassword?.message)
                : null}
            </p>
            <label>
              <FormattedMessage id="app.submit" />
            </label>
            <input type="submit" />
          </form>
        </article>
      </div>
    </main>
  );
}
