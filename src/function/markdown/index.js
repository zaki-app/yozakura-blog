// marked
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import { marked } from "marked";

export function changeHtml (props) {
  // marked.setOptions({
  //   renderer: new marked.Renderer(),
  //   highlight: function(code, lang) {
  //     const hljs = require('highlight.js');
  //     const language = hljs.getLanguage(lang) ? lang: 'plaintext';
  //     console.log("言語", language);
  //     console.log("コード？？", code);
  //     // return hljs.highlight(code, { language }).value;
  //     return hljs.highlight(code, { language });
  //   },
  //   langPrefix: 'hljs lang-',
  //   pedantic: false,
  //   gfm: true,
  //   breaks: true,
  //   sanitize: false,
  //   smartypants: false,
  //   xhtml: false
  // });
  // const renderer = {
  //   heading(text, level) {
  //     const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  //     return `
  //     <h${level}>
  //       <a name="${escapedText}" class="anchor" href="#${escapedText}">
  //         <span class="header-link"></span>
  //       </a>
  //         ${text}
  //     </h${level}>
  //   `;
  //   }
  // }
  // marked.use({ renderer })

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
      ""
    ],
  };
  
  // const htmlText = DOMPurify.sanitize(html, config);

  return html;
}
