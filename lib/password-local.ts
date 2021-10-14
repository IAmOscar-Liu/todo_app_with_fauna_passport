import Local from "passport-local";
import { loginUser } from "./user";

export const localStrategy = new Local.Strategy(function (
  username,
  password,
  done
) {
  loginUser({
    email: username,
    password,
  })
    .then((userInfo) => {
      if (userInfo) {
        done(null, userInfo);
      } else {
        done(new Error("Invalid email and password combination"));
      }
    })
    .catch((error) => done(error));
});
