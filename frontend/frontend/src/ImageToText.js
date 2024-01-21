import { useState } from "react";
import { Main } from "./Main";
import { Navbar } from "./Navbar";

export function ImageToText() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [image, setImage] = useState("sample.jpg");
  const handleSearchPage = function (value) {
    setShowSearchPage(value);
  };

  const reset = function () {
    setImage("sample.jpg");
    handleSearchPage(false);
  };
  return (
    <>
      <Navbar showSearchPage={showSearchPage} image={image} reset={reset} />
      <Main
        showSearchPage={showSearchPage}
        handleSearchPage={handleSearchPage}
        image={image}
        setImage={setImage}
      ></Main>
    </>
  );
}
