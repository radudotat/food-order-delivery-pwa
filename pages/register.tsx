import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { createCsrfToken } from '../lib/auth';
import { getValidSessionByToken } from '../lib/database';
import styles from '../styles/Home.module.css';
import { RegisterResponseBody } from './api/register';

const errorStyles = css`
  color: red;
`;

type Errors = { message: string }[];
type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
  csrfToken: string;
};
export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout csrfToken={props.csrfToken} userObject={props.userObject}>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register on this website" />
      </Head>
      <div className={styles.innerPage}>
        <h1>Register</h1>
        <form
          className={styles.innerForm}
          onSubmit={async (event) => {
            event.preventDefault();

            const registerResponse = await fetch('/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
                csrfToken: props.csrfToken,
              }),
            });

            const registerResponseBody =
              (await registerResponse.json()) as RegisterResponseBody;

            if ('errors' in registerResponseBody) {
              setErrors(registerResponseBody.errors);
              return;
            }

            props.refreshUserProfile();
            await router.push('/');
          }}
        >
          <label>
            Username:{' '}
            <input
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <label>
            Password:{' '}
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
          <button className={styles.buttonForm}>Register</button>
        </form>

        <div css={errorStyles}>
          {errors.map((error) => {
            return <div key={`error-${error.message}`}>{error.message}</div>;
          })}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/register`,
        permanent: true,
      },
    };
  }

  // 1. check if there is a token and is valid from the cookie
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if the token its valid and redirect
    const session = await getValidSessionByToken(token);

    if (session) {
      console.log(session);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  // 3. otherwise render the page

  return {
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}
