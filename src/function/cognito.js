const { Auth } = require("aws-amplify");

export const setValue = [
  {
    attribute: "メールアドレス",
    type: "email",
    name: "email",
  }
]

// signup
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

// resend code
export async function resendCode (username) {
  try {
    await Auth.resendSignUp(username);
    console.log("success resend code");
    return true;
  } catch (err) {
    console.error("resend code error...", err);
    return false;
  }
}

// confirm code 
export async function confirmCode (username, code) {
  try {
    await Auth.confirmSignUp(username, code);
    console.log("confirm success");
    return true;
  } catch (err) {
    console.log("error confirm code", err);
    return false;
  }
}

// sign in
export async function signIn (username, password) {
  try {
    const user = await Auth.signIn(username, password);
    console.log("success signin", user);
    return true;
  } catch (err) {
    console.error("signin error...", err);
    return false;
  }
}

