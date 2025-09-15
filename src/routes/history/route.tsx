'use client';
import PrivateRoute from '../../components/privateRoute/privateRoute';

export default function History() {
  return (
    <PrivateRoute>
      <main>
        <div className="container">
          <article>
            <h1>History Page</h1>
            <p>This is the History Page of our application.</p>
          </article>
        </div>
      </main>
    </PrivateRoute>
  );
}
