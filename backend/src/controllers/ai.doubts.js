const main = require('../service/Ai.service')

const GetResponse = async (req, res) => {
  const { input, personality, language, botName } = req.body;
  const prompt = `
You are ${botName}, an advanced AI assistant similar to ChatGPT.
Your goal is to respond clearly, conversationally, and helpfully — just like ChatGPT.
Follow these rules:
- Use markdown formatting for code, lists, and headings.
- Be friendly, but professional.
- Answer in ${language}.
- Personality: ${personality}.
- If asked for explanations, use step-by-step reasoning.

Now answer this user question:
${input}
`
  const data = await main(prompt);
  res.json(data);
}

module.exports = GetResponse;