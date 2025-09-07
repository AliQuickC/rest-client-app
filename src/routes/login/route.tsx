'use client';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  email: string;
  password: string;
}
export default function Login() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <main>
      <div className="container">
        <article>
          <h1>Login Page</h1>
          <p>This is the Login Page of our application.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
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
