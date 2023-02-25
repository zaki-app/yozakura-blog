import { parse } from "twemoji-parser";

export const emojiParse = (emoji) => {
  const entities = parse(emoji);
  const url = entities[0]["url"];
  // console.log(url)
  return url;
}

export const emojiPaseOnly = (emoji) => {
  return parse(emoji);
}