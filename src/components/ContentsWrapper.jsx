import { useEffect, useState } from "react";

export default function ContentsWrapper (props) {
  // マウントの確認後に表示するようにする
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="common-contents">
      {isMounted && props.children}
    </div>
  )
}