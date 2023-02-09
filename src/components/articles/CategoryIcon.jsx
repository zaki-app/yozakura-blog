import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { centerState } from "@/function/atom/Atom";
import { newDisplayName } from "@/function/categoryName";
import ArticleCard from '@/components/articles/ArticleCard';
import ContentsWrapper from "../ContentsWrapper";
import {ArrowDropDownCircle} from '@mui/icons-material';
import { emojiParse } from '@/function/emojiParse';
import Image from 'next/image';

export default function CategoryIcon ({articles}) {
  console.log("これはなに？", articles)
  emojiParse("😷")
  // const categories = useRecoilValue(centerState);
  // const [categoryItems, setCategoryItems] = useState([]);
  // const [category, setCategory] = useState("all");

  // 投稿済カテゴリ画像取得
  // useEffect(() => {
  //   showIconZone();
  // },[categories]);

  // function showIconZone () {
  //   setCategoryItems(articles.categoryItems);
  // };

  // // アイコンクリック時の表示切り替え
  // function changeArticle (category) {
  //   setCategory(category)
  // }
  
  return (
    <>
      <div className="category">
        <div className="category-inner">
          <div className="category-inner__box">
            <Image
              src="/category/all.svg"
              alt="all"
              width={50}
              height={50}
            />
            <p>ALL</p>
          </div>
          <div className="category-inner__box">
            <Image
              src="/category/frontend.svg"
              alt="all"
              width={50}
              height={50}
            />
            <p>フロント</p>
          </div>
          <div className="category-inner__box">
            <Image
              src="/category/backend.svg"
              alt="all"
              width={50}
              height={50}
            />
            <p>バック</p>
          </div>
          <div className="category-inner__box">
            <Image
              src="/category/infra.svg"
              alt="all"
              width={50}
              height={50}
            />
            <p>インフラ</p>
          </div>
          <div className="category-inner__box">
            <Image
              src="/category/other.svg"
              alt="all"
              width={50}
              height={50}
            />
            <p>その他</p>
          </div>
        </div>
        {/* {categoryItems.map(category => (
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
        ))} */}
      </div>
      <ContentsWrapper>
        <div className="article-title">
          {/* <p>{newDisplayName(category)}の記事</p> */}
          <ArrowDropDownCircle />
        </div>
        {/* <ArticleCard select={category} /> */}
      </ContentsWrapper>
    </>
  )
}