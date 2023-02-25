import ContentsWrapper from "@/components/ContentsWrapper";
import PageSEO from "@/components/PageSEO";
import { useState } from "react";
import { confirmCode, resendCode } from "@/function/cognito";
import { useRouter } from "next/router";

export default function ConfirmCode () {
  // router
  const router = useRouter();
  // resend
  const [resendEmail, setResendEmail] = useState("");
  function executeResendCode (e) {
    e.preventDefault();
    resendCode(resendEmail);
  }

  // confirm
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  async function executeConfirmCode (e) {
    e.preventDefault();
    const result = await confirmCode(email, code);
    if (result) router.push("/admin/signin");
  }

  // set
  function changeVal(e) {
    const val = e.target.value;
    const name = e.target.name;
    if (name === 'resendEmail') {
      setResendEmail(val);
    } else if (name === 'email') {
      setEmail(val);
    } else if (name === 'code') {
      setCode(val);
    }
  }

  return (
    <>
      <PageSEO title="認証コード確認" />
      <ContentsWrapper>
        <h1>認証コード</h1>
        <input
          type="email"
          name="resendEmail"
          value={resendEmail}
          onChange={changeVal}
        />
        <button onClick={executeResendCode}>再送</button>
        <br />
        <h2>認証コードの確認</h2>
        <label>登録したメールアドレス</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={changeVal}
        />
        <br />
        <label>認証コード</label>
        <input
          type="text"
          name="code"
          value={code}
          onChange={changeVal}
        />
        <br />
        <button onClick={executeConfirmCode}>再送</button>
      </ContentsWrapper>
    </>
  )
}