import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import { centerState } from "@/function/atom/Atom";

// カテゴリ画像を返すだけ
export const CategoryBlock = (props) => {
  console.log("カテゴリーブロック");
  const [category, setCategory] = useState("");
  // const [categorySvg, setCategorySvg] = useRecoilState(centerState);

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