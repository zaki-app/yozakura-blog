import { config } from "@/config/site.config";

export default function Footer () {
  return (
    <footer className="footer">
      <div className="footer__text">{config.footer.title}</div>
      <div className="footer__logo">&#127800;</div>
    </footer>
  )
}