require("dotenv").config();
const Replicate = require("replicate");

exports.handler = async (req, res) => {
  try {
    const replicateApiToken = process.env.SERVER_REPLICATE_API_TOKEN;
    const replicate = new Replicate({
      auth: replicateApiToken,
    });

    // Handle different request types within the handler
    if (req.method === "GET" && req.path === "/api/convert") {
      res.send("Send POST requests to get conversions");
    } else if (req.method === "POST" && req.path === "/api/convert") {
      const output = await replicate.run(
        "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        {
          input: {
            prompt: req.body.prompt,
          },
        }
      );
      res.json({ result: output });
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
