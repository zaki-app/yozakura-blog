import { config } from "@/config/site.config";
import { currentAuthUser, getCurrentUserIdToken, signOut } from "@/function/cognito";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header () {
  const router = useRouter();
  const [token, setToken] = useState();

  useEffect(() => {
    currentAuthUser().then(async(res) => {
      const idToken = await getCurrentUserIdToken();
      if (idToken) setToken(idToken)
    });
  }, []);

  async function executeSignOut (e) {
    e.preventDefault();
    try {
      const result = await signOut();
      if (result) router.push("/");
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <header>
      <div className="header">
        <div className="header__title">
          <Link href={"/"}>
            <h1>{ config.siteTitle.title }</h1>
          </Link>
        </div>
        <div className="header__lists">
          {config.headerLists.map((list, i) => {
            if (list.href) {
              return (
                <Link key={i} href={list.href}>
                  <p>{ list.title }</p>
                </Link>
              )
            }
          })}
          {token ? <p onClick={executeSignOut}>サインアウト</p> : null}
        </div>
      </div>
    </header>
  )
}