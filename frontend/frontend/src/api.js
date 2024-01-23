export async function clipBoardAPI(prompt, negativePrompt) {
  const negative_prompt =
    negativePrompt ||
    "bad anatomy,bad hands,three hands,three legs,bad arms,missing arms,missing legs,poorly drawn face,bad face,fused face, cloned face,worst face,three crus,extra crus,fused crus,worst feet,three feet,fused feet,fused thigh,extra thigh,worst thigh,missing fingers,extra fingers,ugly fingers,long fingers,horn,extra eyes,,huge eyes,2girl,amputation,disconnected limbs,cartoon,cgi,3d,unreal,animate,worst quality,low quality,sketch,blurry,ugly,cropped";
  const {
    result: [imageURL],
  } = await fetch(`https://midy-ai-sdxl-replicate.vercel.app/api/convert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, negative_prompt }),
  }).then((res) => res.json());
  console.log("Hello");
  return imageURL;
}
