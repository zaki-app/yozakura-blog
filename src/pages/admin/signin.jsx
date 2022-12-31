import PageSEO from "@/components/PageSEO";
import ContentsWrapper from "@/components/ContentsWrapper";
import { useState } from "react";
import { signIn } from "@/function/cognito";
import { useRouter } from "next/router";

export default function SignIn () {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function executeSignIn (e) {
    e.preventDefault();
    const result = await signIn(email, password);
    if (result) router.push("/admin/articles");
  }

  // val
  function changeVal (e) {
    const val = e.target.value;
    const name = e.target.name;
    if (name === "email") setEmail(val)
    else if (name === "password") setPassword(val);
  }
  
  return (
    <>
      <PageSEO />
      <ContentsWrapper>
        <h1>サインイン</h1>
        <form onSubmit={executeSignIn}>
          <label>メールアドレス</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeVal}
          />
          <br />
          <label>パスワード</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={changeVal}
          />
          <br />
          <button type="submit">ログイン</button>
        </form>
      </ContentsWrapper>
    </>
  )
}