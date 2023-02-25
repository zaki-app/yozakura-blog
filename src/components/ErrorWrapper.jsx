import Link from "next/link";
import Image from "next/image";
import { config } from "@/config/site.config";
import { useState, useEffect } from "react";

export default function ErrorWrapper({statusCode}) {
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function dynamicMsg () {
    if (statusCode === "404") {
      setStatusMsg('Not Found');
      setErrorMsg('指定したページが見つかりませんでした');
    } else if (statusCode === '500') {
      setStatusMsg('Internal Server Error');
      setErrorMsg('アクセスしようとしたページは表示できません');
    }
  }

  useEffect(() => {
    dynamicMsg();
  }, []);

  return (
    <div className="error">
      <div className="error__inner">
        <h1>{statusCode}</h1>
        <p className="status-message">{statusMsg}</p>
        <p className="status-message">{errorMsg}</p>
        <div className="icon">
          <Image
            src={config.siteIcon}
            alt="サイトロゴ"
            width={100}
            height={100}
          />
        </div>
        <div className="error-btn">
          <Link href="/">トップページに戻る</Link>
        </div>
      </div>
    </div>
  )
}