import React, { useState, useCallback } from 'react';
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
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8, // Requer um movimento de 8px antes de iniciar o drag
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const startEditing = useCallback(
		(task: Task) => {
			// Se já estiver editando outra tarefa, cancela a edição anterior
			if (editingTaskId !== null && editingTaskId !== task.id) {
				setEditingTaskId(null);
			}
			setEditingTaskId(task.id);
		},
		[editingTaskId]
	);

	const stopEditing = useCallback(() => {
		setEditingTaskId(null);
	}, []);

	const saveEdit = useCallback(
		(id: number, newName: string) => {
			if (onEdit) {
				onEdit(id, newName);
			}
			stopEditing();
		},
		[onEdit, stopEditing]
	);

	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;

			if (over && active.id !== over.id && onReorder) {
				const oldIndex = tasks.findIndex((task) => task.id === active.id);
				const newIndex = tasks.findIndex((task) => task.id === over.id);

				const reorderedTasks = arrayMove(tasks, oldIndex, newIndex).map((task, index) => ({
					...task,
					order: index,
				}));

				onReorder(reorderedTasks);
			}
		},
		[tasks, onReorder]
	);

	const handleToggle = useCallback(
		(id: number) => {
			// Se estiver editando, cancela a edição antes de alternar
			if (editingTaskId !== null) {
				stopEditing();
			}
			onToggle(id);
		},
		[editingTaskId, onToggle, stopEditing]
	);

	const handleDelete = useCallback(
		(id: number) => {
			// Se estiver editando, cancela a edição antes de deletar
			if (editingTaskId !== null) {
				stopEditing();
			}
			onDelete(id);
		},
		[editingTaskId, onDelete, stopEditing]
	);

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
								onToggle={handleToggle}
								onDelete={handleDelete}
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
