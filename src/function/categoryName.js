export const newDisplayName = (category) => {
  let result;
  
  switch(category) {
    case "rust":
      result = "Rust";
      break;
    case "nodejs":
      result = "Node.js";
      break;
    case "nextjs":
      result = "Next.js";
      break;
    default:
      result = "すべて";
  }
  
  return result;
}