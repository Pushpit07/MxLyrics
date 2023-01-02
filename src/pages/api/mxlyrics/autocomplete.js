import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Generate song lyrics including the lines below. Please make sure the song is filled with feelings and feels like a natural.

Lyrics:
`;

const generateAction = async (req, res) => {
	const lyricsAutocompletePrompt = `${basePromptPrefix}${req.body.userInput}`;

	const baseCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: lyricsAutocompletePrompt,
		temperature: 0.7,
		max_tokens: 800,
	});

	const basePromptOutput = baseCompletion.data.choices.pop();

	res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
