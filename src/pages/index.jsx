import Head from "next/head";
import { meta_description } from "@/config/constants";
import Image from "next/image";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import styles from "@/styles/MxLyrics/MxLyrics.module.css";
import InputDropdown from "@/components/InputDropdown";
import { languageArray, genreArray } from "@/config/constants";

const MxLyrics = () => {
	const [choice, setChoice] = useState("generateLyrics");
	const [userInput, setUserInput] = useState("");
	const [apiOutput, setApiOutput] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);

	// Dropdowns
	const [language, setLanguage] = useState("English");
	const [genre, setGenre] = useState("Hip-Hop");

	const callGenerateEndpoint = async () => {
		setIsGenerating(true);

		const response = await fetch("/api/mxlyrics/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: userInput, language: language, genre: genre }),
		});
		const data = await response.json();
		const { output } = data;

		setApiOutput(`${output.text}`);
		setIsGenerating(false);
	};

	const callAutocompleteEndpoint = async () => {
		setIsGenerating(true);

		const response = await fetch("/api/mxlyrics/autocomplete", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userInput: userInput, language: language, genre: genre }),
		});

		const data = await response.json();
		const { output } = data;

		setApiOutput(`${output.text}`);
		setIsGenerating(false);
	};

	return (
		<>
			<Head>
				<title>Musixverse | Mx Lyrics</title>
				<meta name="description" content={meta_description} />
			</Head>

			<div className="flex items-center justify-center bg-dark-900">
				<div className="lg:flex-row flex-col flex w-full h-full max-w-[1920px] px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-36">
					<div className="w-full md:gap-x-12 lg:gap-x-20 xl:gap-x-36 2xl:gap-x-48 overflow-y-auto no-scrollbar flex flex-col md:flex-row itmes-center lg:items-start justify-center m-0 p-0 pb-40 lg:p-0">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (!isGenerating) {
									if (choice === "generateLyrics") {
										callGenerateEndpoint();
									} else {
										callAutocompleteEndpoint();
									}
								}
							}}
							className="lg:mt-0 mt-40 lg:h-screen items-center flex flex-col justify-center"
						>
							<p className="lg:text-[100px] md:text-[90px] sm:text-[75px] text-[70px] text-center font-bold -tracking-2">
								M<span className="text-primary-400 lg:text-[85px] md:text-[70px] sm:text-[60px] text-[55px]">x</span> L
								<span className="lg:text-[85px] md:text-[70px] sm:text-[60px] text-[55px]">yrics</span>
							</p>
							<h1 className="text-lg md:text-xl text-center font-semibold -mt-2">say goodbye to creative blocks</h1>

							<div className="mt-16 flex flex-col justify-center items-center">
								<div className="w-full flex justify-between text-xs sm:text-sm">
									<span
										className={
											"sm:px-8 sm:py-3 px-4 py-2 bg-dark-600 rounded-full cursor-pointer border " +
											(choice == "generateLyrics" ? "border-primary-400" : "border-transparent")
										}
										onClick={() => {
											if (choice === "autocompleteLyrics") {
												setUserInput("");
											}
											setChoice("generateLyrics");
										}}
									>
										Generate Lyrics
									</span>
									<span
										className={
											"sm:px-8 sm:py-3 px-4 py-2 bg-dark-600 rounded-full cursor-pointer border " +
											(choice == "autocompleteLyrics" ? "border-primary-400" : "border-transparent")
										}
										onClick={() => {
											if (choice === "generateLyrics") {
												setUserInput("");
											}
											setChoice("autocompleteLyrics");
										}}
									>
										Autocomplete Lyrics
									</span>
								</div>

								<div className="mt-10 text-[11px] sm:text-lg text-light-600">let us help you fastrack your music creation process</div>
								{choice == "generateLyrics" ? (
									<textarea
										rows={1}
										className="mt-2 sm:mt-4 w-full flex gap-4 items-start justify-start placeholder-light-800 bg-dark-600 border border-dark-300 focus:outline-none focus:border-primary-500 rounded-xl overflow-auto px-5 py-4 resize-none"
										placeholder="enter song name"
										value={userInput}
										onChange={(event) => setUserInput(event.target.value)}
										required
									/>
								) : (
									<textarea
										rows={8}
										className="mt-2 sm:mt-4 w-full flex gap-4 items-start justify-start placeholder-light-800 bg-dark-600 border border-dark-300 focus:outline-none focus:border-primary-500 rounded-xl overflow-auto px-5 py-4 resize-none"
										placeholder="enter your lyrics"
										value={userInput}
										onChange={(event) => setUserInput(event.target.value)}
										required
									/>
								)}

								<div className="w-full flex mt-6 gap-8 text-light-700 font-medium text-xs">
									<div className="w-full">
										<p className="mb-1">Language</p>
										<InputDropdown
											optionsArray={languageArray.filter((x) => x != "English, Hindi")}
											setChoice={setLanguage}
											initialValue={language}
											classes="rounded"
											location="left"
										/>
									</div>
									<div className="w-full">
										<p className="mb-1">Genre</p>
										<InputDropdown optionsArray={genreArray} setChoice={setGenre} initialValue={genre} classes="rounded" />
									</div>
								</div>

								<CustomButton
									type="submit"
									disabled={isGenerating}
									green={true}
									classes="mt-10 text-md px-10 py-3 rounded-full shrink-0 transform-none"
								>
									{isGenerating ? <span className={styles["loader"]}></span> : choice == "generateLyrics" ? "Generate" : "Autocomplete"}
								</CustomButton>
							</div>
						</form>

						{apiOutput && (
							<div className="mt-20 lg:mt-40 pb-20 flex flex-col justify-center items-center">
								<div className="flex font-tertiary text-5xl">
									<h3>Lyrics</h3>
								</div>

								<div className="mt-4 flex flex-col justify-start shrink-0 transform-none break-words">
									<p className="p-2 text-center whitespace-pre text-light-500 text-xs md:text-base break-words">{apiOutput}</p>
								</div>
							</div>
						)}
					</div>

					<div className="badge-container grow">
						<a href="https://www.musixverse.com" target="_blank" rel="noopener noreferrer">
							<div className="badge">
								<Image src={"/mxv-logo.png"} width="50" height="20" alt="musixverse logo" />
								<p>a product by Musixverse</p>
							</div>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default MxLyrics;
