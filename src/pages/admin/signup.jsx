import PageSEO from "@/components/PageSEO";
import ContentsWrapper from "@/components/ContentsWrapper";
import { setValue, signUp } from "@/function/cognito";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp () {
  // router
  const router = useRouter();
  // sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  // execute
  const executeSignUp = async(e) => {
    e.preventDefault();
    console.log(email, password, nickname, profile);
    const result = await signUp(email, password, nickname, profile);
    console.log("結果", result);
  }
  // set
  const changeVal = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    if (name === "email") {
      setEmail(val);
    } else if (name === "password") {
      setPassword(val);
    } else if (name === "nickname") {
      setNickname(val);
    } else if (name === "profile") {
      setProfile(val)
    } else {
      console.log("なにもない");
    }
  }

  return (
    <>
      <PageSEO title="サインアップ" />
      <ContentsWrapper>
        <h1>サインアップ</h1>
        <form onSubmit={executeSignUp}>
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
          <label>ユーザー名</label>
          <input
            type="nickname" 
            name="nickname"
            value={nickname}
            onChange={changeVal}
          />
          <br />
          <label>プロフィール</label>
          <textarea
            type="profile" 
            name="profile"
            value={profile}
            onChange={changeVal}
          />
          <br />
          <button type="submit">登録</button>
        </form>
      </ContentsWrapper>
    </>
  )
}