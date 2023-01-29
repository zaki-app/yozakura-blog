// marked
import DOMPurify from "dompurify";
import { marked } from "marked";

export function changeHtml (props) {
  marked.setOptions({
    breaks: true,
  })
  const html = marked.parse(props);

  console.log("result markdown", html)

  const config = {
    ALLOWED_ATTR: [
      // 許可する属性
      "href",
      "target",
      "rel",
      "src"
    ],
    ALLOWED_TAGS: [
      // 許可するタグ
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "blockquote",
      "strong",
      "em",
      "a",
      "hr",
      "del",
      "pre",
      "code",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      ""
    ],
  };
  
  const htmlText = DOMPurify.sanitize(html, config);

  console.log("どうなる？？", htmlText)
  return htmlText;
}

export function changeBr (props) {
  return props.replace(/[\n\r]/g, "<br />")
}