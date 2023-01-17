import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { centerState } from "@/function/atom/Atom";
import { CategorySearch } from "@/function/axios";

export default function CategoryIcon () {
  const categories = useRecoilValue(centerState);
  const [categoryImg, setCategoryImg] = useState([]);

  // 投稿済カテゴリ画像取得
  useEffect(() => {
    console.log("2回目のcategories更新時のみ")
    getImage();
  },[categories]);

  async function getImage () {
    if (categories.length > 0) {
      const result = await Promise.all(categories.map(async(category) => {

        const svg = await getS3CategoryImage(category);
        return svg;
      }));
      setCategoryImg(result);
    }
  };
  
  return (
    <div className="category-image-top">
      <div className="category-image-top__box">
        <div className="logo">
          すべて
        </div>
        <div
          className="logo"
          dangerouslySetInnerHTML={{ __html: categoryImg }}
        >
        </div>
        <div className="name">
          Javascriptなど
        </div>
      </div>
    </div>
  )
}