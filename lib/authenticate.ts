import passport from "passport";
import { localStrategy } from "./password-local";
import { NextApiRequest, NextApiResponse } from "next";
import { setLoginSession } from "./auth";

passport.use(localStrategy);

export const authenticate = (
  method: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });
};

export const handleSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user: any = await authenticate("local", req, res);
    // session is the payload to save in the token, it may contain basic info about the user
    const session = { ...user.login };

    await setLoginSession(res, session);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
};
