import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

// ローディング アイコン
const Loading = ({
  type = "balls", 
  color = "#90ccce"
}) => {
  // スクロール禁止
  // const [scroll, setScroll] = useState(0);

  // useEffect(() => {
  //   notScroll();
  // }, []);

  // function notScroll() {
  //   document.addEventListener('touchmove', (e => e.preventDefault()), { passive: false });
  //   document.addEventListener('mousewheel', (e => e.preventDefault()),{ passive: false });
  // }
  
  return (
    <div className="loading">
      <div className="loading__icon">
        <ReactLoading
          type={type}
          color={color}
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}

export default Loading;