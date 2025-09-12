import { Outlet } from 'react-router';

import { Layout as ClientLayout } from './client';
import './styles.sass';
import './app.sass';

export { ErrorBoundary } from './client';

export async function Layout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}

export default function Component() {
  return (
    <>
      <Outlet />
    </>
  );
}
