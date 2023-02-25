import ContentsWrapper from "@/components/ContentsWrapper";
import UseRequireLogin from "@/function/hooks/useRequireLogin";
import { useEffect, useState } from "react";
import CreateMarkdown from "@/components/admin/CreateMarkdown";
import { useRouter } from "next/router";

export default function ArticleCreate () {
  const router = useRouter();
  const [isDisplay, setIsDisplay] = useState(false);

  useEffect(() => {
    (async() => {
      const loginStatus = await UseRequireLogin();

      if (loginStatus) {
        setIsDisplay(loginStatus);
      } else {
        router.push('/');
      }
    })();
  }, []);
  

  return (
    <>
      {isDisplay ? <CreateMarkdown /> : <ContentsWrapper />}
    </>
  )
}