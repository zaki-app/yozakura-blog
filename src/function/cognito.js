const { Auth } = require("aws-amplify");

export const setValue = [
  {
    attribute: "メールアドレス",
    type: "email",
    name: "email",
  }
]

export async function signUp (username, password, nickname, profile) {
  try {
    const user = await Auth.signUp({
      username,
      password,
      attributes: {
        email: username,
        nickname: nickname,
        profile: profile,
      },
      autoSignIn: {
        enabled: true
      }
    });
    console.log("success", user);
    return true;
  } catch (err) {
    console.error("signUp error...", err);
    return false;
  }
}
