import { ArrowDropDownCircle } from "@mui/icons-material";

export default function OtherArticle (props) {
  return (
    <div className="other-article">
      <p>{props.category}の記事</p>
      <ArrowDropDownCircle />
    </div>
  )  
}