'use client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { auth } from '../../config/firebase.ts';
import { useAppState } from '../../redux/useAppSelector.ts';
import { useActions } from '../../redux/useActions.ts';

interface IFormInput {
  email: string;
  password: string;
}
export default function signIn() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { isLogin } = useAppState();
  const { login, logout } = useActions();

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

  const handleLogin: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
          <h1>Sign Page</h1>
          <p>This is the sign Page of our application.</p>
          <form onSubmit={handleSubmit(handleLogin)}>
            <h1>ITS LOGIN IN</h1>
            <label>Email</label>
            <input
              placeholder="Enter email"
              type="text"
              {...register('email')}
            />
            <label>Password</label>
            <input
              placeholder="enter password"
              type="text"
              {...register('password')}
            />
            <label>Submit</label>
            <input type="submit" />
          </form>
        </article>
      </div>
    </main>
  );
}
