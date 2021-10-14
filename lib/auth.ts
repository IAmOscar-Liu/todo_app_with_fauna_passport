import Iron from "@hapi/iron";
import { MAX_AGE, setTokenCookie, getTokenCookie } from "./auth-cookies";
import { NextApiResponse } from "next";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const setLoginSession = async (res: NextApiResponse, session: any) => {
  const createdAt = Date.now();

  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
};

export const getLoginSession = async (req: any, {no_expiration}:{no_expiration: boolean} = {no_expiration: false}) => {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  console.log("getLoginSession");
  console.log(session);
  console.log("session is shown above");

  // Validate the expiration date of the session
  if (Date.now() > expiresAt && !no_expiration) {
    throw new Error("Session expired");
  }

  return session;
};
