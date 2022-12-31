import { useRouter } from "next/router";
import { getCurrentUserIdToken } from "../cognito";

export default function UseRequireLogin () {
  const router = useRouter();
  getCurrentUserIdToken().then(res => {
    console.log("何が入るか？", res);
  }).catch(err => {
    // リロードアイコンを入れないと見れてしまう
    router.push("/");
  });
}