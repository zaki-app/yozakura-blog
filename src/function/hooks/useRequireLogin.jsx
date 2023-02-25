import { getCurrentUserIdToken } from "../cognito";

/**
 * ログイン判定に使用
 * @returns boolean
 */
export default async function UseRequireLogin () {
  const status = await getCurrentUserIdToken().then(res => {
    return true;
  }).catch(err => {
    return false;
  });
  // const loginStatus = await getCurrentUserIdToken();
  // console.log("status", status);
  return status;
}