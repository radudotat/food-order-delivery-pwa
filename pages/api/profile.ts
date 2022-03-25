import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByValidSessionToken } from '../../lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    console.log(req.cookies);
    const token = req.cookies.sessionToken;

    if (!token) {
      res.status(400).json({
        errors: [
          {
            message: 'No session token passed',
          },
        ],
      });
      return;
    }

    const user = await getUserByValidSessionToken(token);

    if (user) {
      res.status(200).json({
        user: user,
      });
      return;
    }

    res.status(404).json({
      errors: [
        {
          message: 'User not found or session token not valid',
        },
      ],
    });
    return;
  }

  res.status(405).json({
    errors: [
      {
        message: 'Method not supported, try GET instead',
      },
    ],
  });
}
