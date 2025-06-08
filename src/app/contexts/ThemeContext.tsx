'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>('light');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Carregar tema do localStorage
		const savedTheme = localStorage.getItem('theme') as Theme;
		if (savedTheme) {
			setTheme(savedTheme);
		} else {
			// Verificar preferência do sistema
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const defaultTheme = prefersDark ? 'dark' : 'light';
			setTheme(defaultTheme);
		}
	}, []);

	useEffect(() => {
		if (mounted) {
			// Aplicar tema ao documento
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
		}
	}, [theme, mounted]);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	};

	// Evitar problemas de hidratação
	if (!mounted) {
		return <>{children}</>;
	}

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
