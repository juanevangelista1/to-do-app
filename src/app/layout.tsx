import "./styles/global.scss";
import Header from "./components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100;200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
