import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateBasePrompt = (language, genre) => {
	const basePromptPrefix = `
	Generate song lyrics including the lines below in the ${language} language. It should be in the ${genre} genre. Please make sure the song is filled with feelings and feels like a natural.

	Lyrics:
	`;
	return basePromptPrefix;
};

const generateAction = async (req, res) => {
	const basePrompt = generateBasePrompt(req.body.language, req.body.genre);
	const lyricsAutocompletePrompt = `${basePrompt}${req.body.userInput}`;

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
