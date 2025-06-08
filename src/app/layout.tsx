import './styles/globals.scss';
import Header from './components/Header';
import { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import { ThemeProvider } from './contexts/ThemeContext';

const interTight = Inter_Tight({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter-tight',
});

export const metadata: Metadata = {
	title: 'To-Do App',
	description: 'Um aplicativo simples e eficiente para gerenciar suas tarefas diárias',
	viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='pt-BR'
			className={interTight.variable}>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								try {
									const theme = localStorage.getItem('theme') || 'light';
									document.documentElement.setAttribute('data-theme', theme);
								} catch (e) {
									document.documentElement.setAttribute('data-theme', 'light');
								}
							})();
						`,
					}}
				/>
			</head>
			<body>
				<Header />
				<ThemeProvider>
					<main>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
