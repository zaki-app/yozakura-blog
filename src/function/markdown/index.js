// marked
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import { marked } from "marked";

export function changeHtml (props) {

  const html = marked.parse(props);

  marked.setOptions({
    langPrefix: "",
    highlight: function(code, lang) {
      return hljs.highlightAuto(code, [lang]).value;
    },
    breaks: true,
  })

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
    ],
  };
  
  // const htmlText = DOMPurify.sanitize(html, config);

  return html;
}
