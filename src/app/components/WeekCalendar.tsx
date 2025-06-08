import React, { useMemo } from 'react';
import { WeekCalendarProps, WeekDay } from '../types/task';
import '../styles/weekCalendar.scss';

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const WeekCalendar: React.FC<WeekCalendarProps> = ({ selectedDate, onDateSelect }) => {
	const weekDays = useMemo(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const selected = new Date(selectedDate);
		selected.setHours(0, 0, 0, 0);

		// Encontrar o domingo da semana atual
		const sunday = new Date(today);
		sunday.setDate(today.getDate() - today.getDay());

		// Gerar os dias da semana
		return Array.from({ length: 7 }, (_, index) => {
			const date = new Date(sunday);
			date.setDate(sunday.getDate() + index);

			return {
				date,
				dayOfWeek: index,
				dayOfMonth: date.getDate(),
				isToday: date.getTime() === today.getTime(),
				isSelected: date.getTime() === selected.getTime(),
			};
		});
	}, [selectedDate]);

	const handleDateClick = (day: WeekDay) => {
		onDateSelect(day.date);
	};

	return (
		<div className='week-calendar'>
			<div className='week-calendar__header'>
				{WEEKDAYS.map((day) => (
					<div
						key={day}
						className='week-calendar__header-day'>
						{day}
					</div>
				))}
			</div>
			<div className='week-calendar__days'>
				{weekDays.map((day) => (
					<button
						key={day.date.toISOString()}
						className={`week-calendar__day ${day.isToday ? 'week-calendar__day--today' : ''} ${
							day.isSelected ? 'week-calendar__day--selected' : ''
						}`}
						onClick={() => handleDateClick(day)}>
						<span className='week-calendar__day-number'>{day.dayOfMonth}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default WeekCalendar;
