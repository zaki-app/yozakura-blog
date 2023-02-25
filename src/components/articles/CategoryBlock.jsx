import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { useEffect, useState } from "react";

// カテゴリ画像を返すだけ
export const CategoryBlock = (props) => {
  console.log("カテゴリーブロック");
  const [category, setCategory] = useState("");

  useEffect(() => {
    (async () => {
      const result = await getS3CategoryImage(props.category);
      setCategory(result);
    })();
  }, []);
  
  return (
      <div
        dangerouslySetInnerHTML={{ __html: category }}
        className="category-image-articles"
      />
  )
}