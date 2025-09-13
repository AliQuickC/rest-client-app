'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { auth } from '../../config/firebase.ts';
import { useActions } from '../../redux/useActions.ts';
import { schema } from '../../yup/yupSignin.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';

interface IFormInput {
  email: string;
  password: string;
}
export default function SignIn() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { login } = useActions();

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
            <p>{errors.email?.message}</p>
            <label>Password</label>
            <input
              placeholder="enter password"
              type="password"
              {...register('password')}
            />
            <p>{errors.password?.message}</p>
            <label>Submit</label>
            <input type="submit" />
          </form>
        </article>
      </div>
    </main>
  );
}
