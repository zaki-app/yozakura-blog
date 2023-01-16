import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { useEffect, useState } from "react";

export const CategoryBlock = (props) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    (async () => {
      const result = await getS3CategoryImage(props.category);
      setCategory(result)
    })();
  }, [])

  console.log("カテゴリ画像", category);
  
  return (
      <div
        dangerouslySetInnerHTML={{ __html: category }}
        className="category-image-articles"
      />
  )
}