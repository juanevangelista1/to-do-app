import React, { useState } from 'react';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskListProps, Task } from '../types/task';
import SortableTaskItem from './SortableTaskItem';
import '../styles/taskList.scss';
import '../styles/modals.scss';

const TaskList: React.FC<TaskListProps> = ({
	tasks,
	onToggle,
	onDelete,
	onEdit,
	showCompleted = true,
	onReorder,
}) => {
	const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const startEditing = (task: Task) => {
		setEditingTaskId(task.id);
	};

	const saveEdit = (id: number, newName: string) => {
		if (onEdit) {
			onEdit(id, newName);
			setEditingTaskId(null);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = tasks.findIndex((task) => task.id === active.id);
			const newIndex = tasks.findIndex((task) => task.id === over.id);

			const reorderedTasks = arrayMove(tasks, oldIndex, newIndex).map((task, index) => ({
				...task,
				order: index,
			}));

			onReorder?.(reorderedTasks);
		}
	};

	const filteredTasks = showCompleted ? tasks : tasks.filter((task) => !task.completed);

	if (filteredTasks.length === 0) {
		return null;
	}

	return (
		<section className='task__container'>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}>
				<SortableContext
					items={filteredTasks.map((task) => task.id)}
					strategy={verticalListSortingStrategy}>
					<ul className='task__container-list'>
						{filteredTasks.map((task) => (
							<SortableTaskItem
								key={task.id}
								task={task}
								onToggle={onToggle}
								onDelete={onDelete}
								isEditing={editingTaskId === task.id}
								onStartEditing={startEditing}
								onSaveEdit={saveEdit}
							/>
						))}
					</ul>
				</SortableContext>
			</DndContext>
		</section>
	);
};

export default TaskList;
