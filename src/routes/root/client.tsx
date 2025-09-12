'use client';

import { isRouteErrorResponse, useRouteError } from 'react-router';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './styles.sass';
import { Footer } from '../../components/Footer/Footer';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import messages_en from '../../lang/en.json';
import messages_ru from '../../lang/ru.json';
import { IntlProvider } from 'react-intl';
import { useAppState } from '../../redux/useAppSelector';
import { Header } from '../../components/Header/Header';

const messages = {
  en: messages_en,
  ru: messages_ru,
};

type Props = {
  children: React.ReactNode;
};

export function App(props: Props) {
  const { locale } = useAppState();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/vnd.microsoft.icon"
          href="/ikar.ico"
        ></link>
        <link rel="icon" type="image/png" href="/ikar.png" />
        <title>Postman</title>
      </head>
      <body>
        <IntlProvider messages={messages[locale]} locale={locale}>
          <MantineProvider>
            <div className="app">
              <Header />
              {props.children}
              <Footer />
            </div>
          </MantineProvider>
        </IntlProvider>
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <App>{children}</App>
    </Provider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = status === 404 ? 'Page not found.' : error.statusText || message;
  }

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
      <article className="prose mx-auto">
        <h1>{status}</h1>
        <p>{message}</p>
      </article>
    </main>
  );
}
