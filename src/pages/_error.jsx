import ErrorWrapper from "@/components/ErrorWrapper";
import PageSEO from "@/components/PageSEO";

export default function Error ({ statusCode }) {

  return (
    <>
      <PageSEO title=""/>
      <ErrorWrapper statusCode={statusCode}/>
    </>
  )  
}

Error.getInitialProps = async ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
}