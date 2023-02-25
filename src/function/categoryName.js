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
    case "nestjs":
      result = "Nest.js";
      break;
    case "git":
      result = "Git";
      break;
    case "test":
      result = "テスト関係";
      break;
    case "other":
      result = "その他";
      break;
    default:
      result = "すべて";
  }
  
  return result;
}

export const newIndustryName = (industry) => {
  let result; 
  
  switch(industry) {
    case "all":
      result = "すべて";
      break;
    case "frontend":  
      result = "フロントエンド";
      break;
    case "backend":
      result = "バックエンド";
      break;
    case "infra":
      result = "インフラ";
      break;
    case "db":
      result = "データベース";
      break;
    case "other":
      result = "その他";
      break;
    default:
      result = "すべて";
  }

  return result;
}