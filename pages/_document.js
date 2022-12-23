import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="shortcut icon" href="/favicon.ico" />

				<meta property="og:title" content="GPT-3 Writer" key="title" />
				<meta property="og:description" content="build with buildspace" key="description" />
				<meta property="og:image" content="https://cdn.buildspace.so/courses/gpt3-writer/project-og.jpg" />
				<meta name="twitter:card" content="summary_large_image"></meta>

				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
