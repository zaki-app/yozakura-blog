import { Auth } from "aws-amplify";

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
    // console.log("success", user);
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
    // console.log("success resend code");
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
    // console.log("confirm success");
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
    // グローバルに保存したい
    const { signInUserSession } = user;
    const idToken = signInUserSession.getIdToken().getJwtToken();
    return true;
  } catch (err) {
    console.error("signin error...", err);
    return false;
  }
}

// sign out(global)
export async function signOut () {
  try {
    await Auth.signOut({ global: true });
    console.log("sign out...");
    return true;
  } catch (err) {
    console.log("sign out error...", err);
    return false;
  }
} 

// 認証済ユーザーを取得
export async function currentAuthUser () {
  try {
    const result = await Auth.currentAuthenticatedUser({
      bypassCache: false
    })
  } catch (err) {
    // console.log("エラーです");
    return false;
  }
  // return result;
}

// idToken取得
export async function getCurrentUserIdToken () {
  const result = await Auth.currentSession();
  const idToken = result.getIdToken().getJwtToken();
  // console.log(idToken);
  return idToken;
}

// nickname取得
export async function getCurrentUserNickname () {
  const result = await Auth.currentAuthenticatedUser();
  if (!result) "no login";
  return result.attributes;
}
