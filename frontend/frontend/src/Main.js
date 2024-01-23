import { useState } from "react";
import { clipBoardAPI } from "./api";
import { ImageSection } from "./ImageSection";
import { Message } from "./Message";
import { Button } from "./Button";
import { RotatingLines } from "react-loader-spinner";

export function Main({ showSearchPage, handleSearchPage, image, setImage }) {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState();
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (!prompt) return;
    const newImageURL = await clipBoardAPI(prompt, negativePrompt);
    setImage(newImageURL);
    setIsLoading(false);
  }
  console.log(image);
  return (
    <main>
      {!showSearchPage ? (
        <Message />
      ) : !isLoading ? (
        <ImageSection image={image} />
      ) : (
        <div className="loader">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      )}
      <section>
        <form onSubmit={handleSubmit}>
          <div className="input-fields">
            <input
              type="text"
              placeholder="Enter your Prompt"
              className={showSearchPage ? "animate-borderColor" : ""}
              required={true}
              onClick={() => (!showSearchPage ? handleSearchPage(true) : null)}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            {showSearchPage || image !== "sample.jpg" ? (
              <input
                type="text"
                placeholder="Enter Negative Prompt (Optional)"
                className={showSearchPage ? "animate-borderColor" : ""}
                value={negativePrompt}
                onChange={(e) => {
                  setNegativePrompt(e.target.value);
                }}
              />
            ) : null}
          </div>
          {showSearchPage ? (
            <Button
              className="retryBtn"
              visibility={
                !image || image === "sample.jpg" ? "hidden" : "visible"
              }
              image={image}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 4C9.25144 4 6.82508 5.38626 5.38443 7.5H8V9.5H2V3.5H4V5.99936C5.82381 3.57166 8.72764 2 12 2C17.5228 2 22 6.47715 22 12H20C20 7.58172 16.4183 4 12 4ZM4 12C4 16.4183 7.58172 20 12 20C14.7486 20 17.1749 18.6137 18.6156 16.5H16V14.5H22V20.5H20V18.0006C18.1762 20.4283 15.2724 22 12 22C6.47715 22 2 17.5228 2 12H4Z"></path>
              </svg>
            </Button>
          ) : null}
        </form>
      </section>
    </main>
  );
}
