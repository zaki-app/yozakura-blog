import PageSEO from "@/components/PageSEO";
import ErrorWrapper from "@/components/ErrorWrapper";

export default function Custom404 () {
  return (
    <>
      <PageSEO title="ページが見つかりませんでした" />
      <ErrorWrapper statusCode="404" />
    </>
  )
}