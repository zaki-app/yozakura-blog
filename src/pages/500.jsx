import PageSEO from "@/components/PageSEO";
import ErrorWrapper from "@/components/ErrorWrapper";

export default function Custom404 () {
  return (
    <>
      <PageSEO title="内部サーバーエラー" />
      <ErrorWrapper statusCode="500" />
    </>
  )
}