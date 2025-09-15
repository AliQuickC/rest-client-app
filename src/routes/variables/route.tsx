'use client';

import PrivateRoute from '../../components/privateRoute/privateRoute';

export default function Variables() {
  return (
    <PrivateRoute>
      <main>
        <div className="container">
          <article>
            <h1>Variables Page</h1>
            <p>This is the Variables Page of our application.</p>
          </article>
        </div>
      </main>
    </PrivateRoute>
  );
}
