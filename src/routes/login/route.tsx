'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { auth } from '../../config/firebase.ts';

interface IFormInput {
  email: string;
  password: string;
}
export default function Login() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const handleSignIn: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully');
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
          <form onSubmit={handleSubmit(handleSignIn)}>
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
