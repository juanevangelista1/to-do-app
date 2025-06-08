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
		onDateSelect(new Date(day.date));
	};

	const handleKeyDown = (e: React.KeyboardEvent, day: WeekDay) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleDateClick(day);
		}
	};

	return (
		<div
			className='week-calendar'
			role='grid'
			aria-label='Calendário semanal'>
			<div
				className='week-calendar__header'
				role='row'>
				{WEEKDAYS.map((day) => (
					<div
						key={day}
						className='week-calendar__header-day'
						role='columnheader'>
						{day}
					</div>
				))}
			</div>
			<div
				className='week-calendar__days'
				role='rowgroup'>
				{weekDays.map((day) => (
					<button
						key={day.date.toISOString()}
						className={`week-calendar__day ${day.isToday ? 'week-calendar__day--today' : ''} ${
							day.isSelected ? 'week-calendar__day--selected' : ''
						}`}
						onClick={() => handleDateClick(day)}
						onKeyDown={(e) => handleKeyDown(e, day)}
						role='gridcell'
						aria-selected={day.isSelected}
						aria-current={day.isToday ? 'date' : undefined}
						tabIndex={0}>
						<span className='week-calendar__day-number'>{day.dayOfMonth}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default WeekCalendar;
