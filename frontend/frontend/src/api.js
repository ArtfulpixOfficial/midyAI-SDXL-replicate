export async function clipBoardAPI(prompt) {
  console.log(prompt);
  const reqBody = JSON.stringyfy({prompt});
  const {
    result: [imageURL],
  } = await fetch(
    `https://midy-ai-sdxl-replicate-test.vercel.app/api/convert`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    }
  ).then((res) => res.json());
  console.log("Hello");
  return imageURL;
}
