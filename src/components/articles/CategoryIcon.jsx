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
  const [category, setCategory] = useState("すべて");

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
        return {name: categoryName, svg: svg, url: category};
      }));
      
      // 重複削除
      const unique = Array.from(
        new Map(categoryItems.map(category => [category.name, category])).values()
      );
      // default add
      unique.unshift({name: "すべて", svg: "🌸", url: "all" });
      console.log("ユニーク",unique);
      setCategoryItems(unique);
    }
  };

  // カテゴリーごとに表示切り替え
  function changeArticle (category) {
    if (category === "all") {
      console.log("全て表示します", category);
    } else {
      console.log("ここにカテゴリのAPIを呼ぶ処理を書きます", category);
      getCategoryArticle(category);
    }
  }

  // カテゴリごとの記事を取得
  async function getCategoryArticle(category) {
    const response = await CategorySearch(category);
    console.log("カテゴリごと", response);
    setCategory(category);
  }
  
  return (
    <>
      <div className="category-image-top">
        {categoryItems.map(category => (
          <div 
            className="category-image-top__box"
            key={category.name}
            onClick={() => changeArticle(category.url)}
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
      <div className="article-title">
        {category}の記事⬇️
      </div>
      <ArticleCard />
    </>
  )
}