import { parse } from "twemoji-parser";

export const emojiParse = (emoji) => {
  const entities = parse(emoji);
  const url = entities[0]["url"];
  return url;
}