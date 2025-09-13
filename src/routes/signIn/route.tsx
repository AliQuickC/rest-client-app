'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { auth } from '../../config/firebase.ts';
import { useActions } from '../../redux/useActions.ts';
import { schema } from '../../yup/yupSignin.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { FormattedMessage } from 'react-intl';

interface IFormInput {
  email: string;
  password: string;
}
export default function SignIn() {
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
          <p>
            <FormattedMessage id="app.signInDescription" />
          </p>
          <form onSubmit={handleSubmit(handleLogin)}>
            <label>
              <FormattedMessage id="app.email" />
            </label>
            <input type="text" {...register('email')} />
            <p>
              {errors.email?.message
                ? getTranslate(errors.email?.message)
                : null}
            </p>
            <label>
              <FormattedMessage id="app.password" />
            </label>
            <input type="password" {...register('password')} />
            <p>
              {errors.password?.message
                ? getTranslate(errors.password?.message)
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
