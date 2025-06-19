export type Priority = 'low' | 'medium' | 'high';

export interface Task {
	id: number;
	name: string;
	completed: boolean;
	order: number;
	date: string; // Data no formato YYYY-MM-DD
	priority: Priority;
}

export interface TaskListProps {
	tasks: Task[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit?: (id: number, newName: string) => void;
	showCompleted?: boolean;
	onReorder?: (reorderedTasks: Task[]) => void;
}

export interface TaskItemProps {
	task: Task;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit?: (id: number, newName: string) => void;
	isEditing: boolean;
	onStartEditing: (task: Task) => void;
	onSaveEdit: (id: number, newName: string) => void;
}

export interface TaskStorage {
	saveTasks: (tasks: Task[]) => void;
	loadTasks: () => Task[];
}

export interface WeekDay {
	date: Date;
	dayOfWeek: number; // 0-6 (Domingo-Sábado)
	dayOfMonth: number;
	isToday: boolean;
	isSelected: boolean;
}

export interface WeekCalendarProps {
	selectedDate: Date;
	onDateSelect: (date: Date) => void;
}
