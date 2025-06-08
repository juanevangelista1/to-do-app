export const formatDate = (date: Date): string => {
	return date.toISOString().split('T')[0];
};

export const formatSelectedDate = (date: Date): string => {
	return new Intl.DateTimeFormat('pt-BR', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
	}).format(date);
};
