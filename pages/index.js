import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
	const [userInput, setUserInput] = useState("");
	const [apiOutput, setApiOutput] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);

	const callGenerateEndpoint = async () => {
		setIsGenerating(true);

		console.log("Calling OpenAI...");
		const response = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput }),
		});

		const data = await response.json();
		const { output } = data;
		console.log("OpenAI replied...", output.text);

		setApiOutput(`${output.text}`);
		setIsGenerating(false);
	};

	const onUserChangedText = (event) => {
		setUserInput(event.target.value);
	};

	return (
		<div className="root">
			<Head>
				<title>MxLyrics</title>
			</Head>

			<div className="body">
				<div className="container">
					<div className="header">
						<div className="header-title">
							<p className="header-title-name">
								M<span className="header-title-small header-title-color">x</span> L<span className="header-title-small">yrics</span>
							</p>
							<h1>say goodbye to creative blocks</h1>
						</div>
					</div>
					<div className="prompt-container">
						<div className="header-subtitle">
							<h2>let us help you fastrack your music creation process</h2>
						</div>
						<textarea rows={1} className="prompt-box" placeholder="enter song name" value={userInput} onChange={onUserChangedText} />
						<div className="prompt-buttons">
							<button className={isGenerating ? "generate-button loading" : "generate-button"} onClick={callGenerateEndpoint}>
								<div className="generate">{isGenerating ? <span className="loader"></span> : <p>Generate</p>}</div>
							</button>
						</div>
					</div>
				</div>

				{apiOutput && (
					<div className="output">
						<div className="output-header-container">
							<div className="output-header">
								<h3>Output</h3>
							</div>
						</div>
						<div className="output-content">
							<p>{apiOutput}</p>
						</div>
					</div>
				)}
			</div>

			<div className="badge-container grow">
				<a href="https://musixverse.com" target="_blank" rel="noreferrer">
					<div className="badge">
						<Image src={"/mxv-logo.png"} width="50" height="20" alt="musixverse logo" />
						{/* <Image src={"/favicon.ico"} width="20" height="20" alt="musixverse logo" /> */}
						<p>a product by Musixverse</p>
					</div>
				</a>
			</div>
		</div>
	);
};

export default Home;
