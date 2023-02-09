import PageSEO from '@/components/PageSEO';
import CategoryIcon from '@/components/articles/CategoryIcon';
import { getArticles } from '@/function/axios';
import { getS3CategoryImage } from '@/function/s3/getCategoryImage';
import { newDisplayName } from '@/function/categoryName';
import ArticleCard from '@/components/articles/ArticleCard';
import Category from '@/components/articles/Category';
import { emojiParse } from '@/function/emojiParse';
import Image from 'next/image';
import {ArrowDropDownCircle} from '@mui/icons-material';
import { autoIndustry } from '@/function/markdown/selectCategory';
import Link from 'next/link';
import { useState } from 'react';
import { IndustrySearch } from '@/function/axios';

export default function Home({articles}) {
  
  const [selectArticles, setSelectArticles] = useState(articles);
  const [select, setSelect] = useState("すべて");

  async function selectedArticle (industry) {
    setSelect(industry.label);
    const result = await IndustrySearch(industry.category);
    if (industry.category !== "all") {
      setSelectArticles(result);
    } else {
      setSelectArticles(articles)
    }
  }

  return (
    <>
      <PageSEO title="トップページ" />
      {/* カテゴリーゾーン */}
      <div className="category">
        <div className="category-inner">
          {autoIndustry.map(industry => (
            <div 
              className="category-inner__box" 
              key={industry.id}
              onClick={() => selectedArticle(industry)}
            >
              <Image
                src={industry.src}
                alt={industry.category}
                width={50}
                height={50}
              />
              <p>{industry.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* ボタン */}
      <div className="article-title">
        <p>{select}の記事</p>
        <ArrowDropDownCircle />
      </div>
      {/* 記事 */}
      <div className="articles-flex">
        {selectArticles.map(article => (
          <Link
            href={{
              pathname: `/articles/${article.articleId}`,
              query: {id: article.articleId }
            }}
            as={`/articles/${article.articleId}`}
            key={article.articleId}
          >
            <div className="article-card">
              <div className="article-card__logo">
                <span className="article-card__logo__emoji">
                  {article.emoji 
                    ? <Image 
                        src={emojiParse(article.emoji)} 
                        alt="絵文字" 
                        width={50}
                        height={50}
                      />
                    : <Image
                        src={emojiParse("😷")}
                        alt="絵文字がない"
                        width={50}
                        height={50}
                      />
                  }
                </span>
              </div>
              <h2 className="article-card__title">{article.title}</h2>
              <p className="article-card__createdAt">{article.createdAt}</p>
              <p className="article-card__category">
                <span>{newDisplayName(article.category)}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

// ISRで表示
export const getStaticProps = async() => {
  // console.time("test")
  // console.log("hello", context);
  // 最初のデータ取得
  const articles = await getArticles();
  console.log(articles);
  // カテゴリ取得
  // const industryCategories = await Promise.all(articles.map(async(article) => {
  // //   // 画像とカテゴリ名とURLを配列へ
  // //   // const svg = await getS3CategoryImage(article.category);
  // //   // const categoryName = newDisplayName(article.category);
  // //   // return { name: categoryName, svg: svg, url: article.category }
  // //   return article.industry;
  // }));

  // console.log("職種",industryCategories)

  // カテゴリ重複削除
  // const uniqueItems = Array.from(
  //   new Map(industryCategories.map(industry => industry)).values()
  // );
  // ALLを追加
  // uniqueItems.unshift({name: "すべて", svg: "🌸", url: "all" });
  // uniqueItems.unshift({url: "all"});

  // console.timeEnd("test");
  return {
    props: {
      // categoryItems: uniqueItems,
      articles: articles
    },
    // isr
    revalidate: 10 // 新しいリクエストがあってから10秒間は新しいHTMLを生成しない
  }
}