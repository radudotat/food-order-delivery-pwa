import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyCsrfToken } from '../../lib/auth';
import { createSessionTokenCookie } from '../../lib/cookies';
import {
  createSession,
  getUserWithPasswordHashByUsername,
  User,
} from '../../lib/database';

type LoginRequestBody = {
  username: string;
  password: string;
  csrfToken: string;
};

type LoginNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: LoginRequestBody;
};

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: Pick<User, 'id'> };

export default async function loginHandler(
  request: LoginNextApiRequest,
  response: NextApiResponse<LoginResponseBody>,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password ||
      typeof request.body.csrfToken !== 'string' ||
      !request.body.csrfToken
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Username, password or CSRF token not provided',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    // Verify CSRF Token
    const csrfTokenMatches = verifyCsrfToken(request.body.csrfToken);

    if (!csrfTokenMatches) {
      response.status(403).json({
        errors: [
          {
            message: 'Invalid CSRF token',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      request.body.username,
    );

    if (!userWithPasswordHash) {
      response.status(401).json({
        errors: [
          {
            message: 'Username or password does not match',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    const passwordMatches = await bcrypt.compare(
      request.body.password,
      userWithPasswordHash.passwordHash,
    );

    if (!passwordMatches) {
      response.status(401).json({
        errors: [
          {
            message: 'Username or password does not match',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    // 1. Create a unique token
    const sessionToken = crypto.randomBytes(64).toString('base64');
    let serializedCookie = '';

    if (userWithPasswordHash.id) {
      // 2. Create the session
      const session = await createSession(
        sessionToken,
        userWithPasswordHash.id,
      );

      console.log(session);

      // 3. Serialize the cookie
      serializedCookie = await createSessionTokenCookie(session.token);
    }
    // 4. Add the cookie to the header response
    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({
        user: {
          id: userWithPasswordHash.id,
        },
      });
    return;
  }

  response.status(405).json({
    errors: [
      {
        message: 'Method not supported, try POST instead',
      },
    ],
  });
}
