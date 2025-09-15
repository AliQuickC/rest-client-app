'use client';
import PrivateRoute from '../../components/privateRoute/privateRoute';

export default function Rest() {
  return (
    <PrivateRoute>
      <main>
        <div className="container">
          <article>
            <h1>Rest Page</h1>
            <p>This is the Rest Page of our application.</p>
          </article>
        </div>
      </main>
    </PrivateRoute>
  );
}
