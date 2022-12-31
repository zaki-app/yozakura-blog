import { config } from "@/config/site.config";
import Link from "next/link";

export default function Header () {
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
        </div>
      </div>
    </header>
  )
}