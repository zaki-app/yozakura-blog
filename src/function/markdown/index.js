// import MarkdownIt from "markdown-it";

// export function init (props) {
//   const md = new MarkdownIt({
//     // option
//     html: true,
//     xhtmlOut: true,
//     breaks: true,
//     linkify: true,
//     typographer: true,
//   })
//   const result = md.render(props)
//   return result;
// }

// marked
import { marked } from "marked";

export function changeHtml (props) {
  const html = marked.parse(props)
  return html;
}
