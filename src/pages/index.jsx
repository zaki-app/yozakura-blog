import PageSEO from '@/components/PageSEO';
import { getArticles } from '@/function/axios';
import Image from 'next/image';
import { autoIndustry } from '@/function/markdown/selectCategory';
import { useState } from 'react';
import { IndustrySearch } from '@/function/axios';
import ContentsWrapper from '@/components/ContentsWrapper';
import ArticleCard from '@/components/articles/ArticleCard';
import OtherArticle from '@/components/articles/OtherArticle';
import Loading from '@/components/Loading';

export default function Home({articles}) {
  
  const [selectArticles, setSelectArticles] = useState(articles);
  const [select, setSelect] = useState("すべて");

  async function selectedArticle (industry) {
    setSelect(industry.fullLabel);
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
      {selectArticles.length < 0
        ? <Loading />
        : <ContentsWrapper>
            <OtherArticle category={select} />
            {/* 記事 */}
            <div className="article-link">
              <ArticleCard articles={selectArticles} />
            </div>
          </ContentsWrapper>
      }
    </>
  )
}

// ISRで表示
export const getStaticProps = async() => {
  console.time("test")
  const articles = await getArticles();
  // console.log(articles);
  console.timeEnd("test")
  return {
    props: {
      articles: articles
    },
    // isr
    revalidate: 10 // 新しいリクエストがあってから10秒間は新しいHTMLを生成しない
  }
}