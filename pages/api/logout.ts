import { removeTokenCookie } from "../../lib/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { logoutUser } from "../../lib/user";
import { getLoginSession } from "../../lib/auth";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    removeTokenCookie(res);

    const session = await getLoginSession(req, { no_expiration: true });
    console.log(`logout user secret: ${session && session.secret}`);

    const userSecret = (session && session.secret) || null;

    if (userSecret) {
      await logoutUser(userSecret);
    }

    res.writeHead(302, { Location: "/" });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
