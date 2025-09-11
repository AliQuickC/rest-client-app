'use client';
import './login.sass';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { auth } from '../../config/firebase.ts';
import { useActions } from '../../redux/useActions.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../yup/yup.ts';

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { login } = useActions();

  const handleSignIn: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      login();
      console.log('logged');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="container">
        <article>
          <h1>Login Page</h1>
          <p>This is the Login Page of our application.</p>
          <form onSubmit={handleSubmit(handleSignIn)} className="form">
            <label>Email</label>
            <input
              placeholder="Enter email"
              type="text"
              {...register('email')}
              required
            />
            <p>{errors.email?.message}</p>
            <label>Password</label>
            <input
              placeholder="enter password"
              type="password"
              {...register('password')}
              required
            />
            <p>{errors.password?.message}</p>
            <label>Confirm Password</label>
            <input
              placeholder="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              required
            />
            <p>{errors.confirmPassword?.message}</p>
            <label>Submit</label>
            <input type="submit" />
          </form>
        </article>
      </div>
    </main>
  );
}
