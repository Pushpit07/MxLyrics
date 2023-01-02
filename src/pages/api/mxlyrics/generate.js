import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Write me a song with the title below. Please make sure the song is filled with feelings and feels like a natural.

Title:
`;

const generateAction = async (req, res) => {
	const lyricsGeneratePrompt = `${basePromptPrefix}${req.body.userInput}\n`;

	const baseCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: lyricsGeneratePrompt,
		temperature: 0.7,
		max_tokens: 800,
	});

	const basePromptOutput = baseCompletion.data.choices.pop();

	res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
