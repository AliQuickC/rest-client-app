'use client';

import { useAppState } from '../../redux/useAppSelector';

export default function Home() {
  const { isLogin } = useAppState();

  return (
    <main data-testid="home">
      <div className="container">
        <article>
          <h1>Home Page</h1>
          <p>general information about the developers, project, and course</p>
          {isLogin ? (
            <button>Main Page(Rest)</button>
          ) : (
            <>
              <button>Sign In</button>
              <button>Sign Up</button>
            </>
          )}
        </article>
      </div>
    </main>
  );
}
