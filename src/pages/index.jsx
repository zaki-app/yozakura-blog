import PageSEO from '@/components/PageSEO';
import ContentsWrapper from '@/components/ContentsWrapper';
import ArticleCard from '@/components/articles/ArticleCard';

export default function Home() {
  return (
    <>
      <PageSEO title="トップページ" />
      <ContentsWrapper>
        <ArticleCard />
      </ContentsWrapper>
    </>
  )
}
