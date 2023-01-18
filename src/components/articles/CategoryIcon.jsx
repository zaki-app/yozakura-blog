import { getS3CategoryImage } from "@/function/s3/getCategoryImage";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { centerState } from "@/function/atom/Atom";
import { CategorySearch } from "@/function/axios";
import { newDisplayName } from "@/function/categoryName";
import ArticleCard from '@/components/articles/ArticleCard';

export default function CategoryIcon () {
  const categories = useRecoilValue(centerState);
  const [categoryItems, setCategoryItems] = useState([]);

  // 投稿済カテゴリ画像取得
  useEffect(() => {
    console.log("2回目のcategories更新時のみ")
    getImage();
  },[categories]);

  async function getImage () {
    if (categories.length > 0) {
      const categoryItems = await Promise.all(categories.map(async(category) => {
        const svg = await getS3CategoryImage(category);

        const categoryName = newDisplayName(category);
        return {name: categoryName, svg: svg};
      }));
      
      // 重複削除
      const unique = Array.from(
        new Map(categoryItems.map(category => [category.name, category])).values()
      );
      // default add
      unique.unshift({name: "すべて", svg: "🌸"});
      console.log(unique);
      setCategoryItems(unique);
    }
  };
  
  return (
    <>
      <div className="category-image-top">
        {categoryItems.map(category => (
          <div 
            className="category-image-top__box"
            key={category.name}
          >
            <div
              className="logo"
              dangerouslySetInnerHTML={{ __html: category.svg }}
            >
            </div>
            <div className="name">
              {category.name}
            </div>
          </div>
        ))
        }
      </div>
      <ArticleCard />
    </>
  )
}