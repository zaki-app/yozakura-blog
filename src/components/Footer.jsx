import { config } from "@/config/site.config";
import Image from "next/image";

export default function Footer () {
  return (
    <footer className="footer">
      <div className="footer__text">{config.footer.title}</div>
      <div className="footer__logo">
        <Image
          src={config.siteIcon}
          alt="ロゴ"
          width={25}
          height={25}
        />
      </div>
    </footer>
  )
}