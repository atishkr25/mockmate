import axios from "axios";

const FREE_MODELS = [
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "thinkingmachines/inkling:free",
  "apodex/apodex-1.1-mini:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  "liquid/lfm-2.5-2.6b:free",
];

export const askAi = async (messages) => {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Message array is empty");
  }

  let lastError;
  for (const model of FREE_MODELS) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        { model, messages },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 45000,
        },
      );

      const content = response.data?.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error("AI returned an empty response");
      return content;
    } catch (error) {
      lastError = error;
      console.error(`OpenRouter model failed (${model}):`, error.response?.data || error.message);
    }
  }

  throw new Error(`All configured AI models failed: ${lastError?.message || "unknown error"}`);
};
