import React from 'react';
import Image from 'next/image';
import { TaskItemProps } from '../types/task';
import '../styles/taskList.scss';

const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onToggle,
	onDelete,
	isEditing,
	onStartEditing,
	onSaveEdit,
}) => {
	const [newTaskName, setNewTaskName] = React.useState(task.name);

	const handleSaveEdit = () => {
		if (newTaskName.trim() !== '') {
			onSaveEdit(task.id, newTaskName);
		}
	};

	return (
		<li className='task__container-list-item'>
			<div className='task__container-list-item-content'>
				<label className='custom-checkbox'>
					<input
						type='checkbox'
						checked={task.completed}
						onChange={() => onToggle(task.id)}
					/>
					<span className='checkmark'></span>
				</label>

				{isEditing ? (
					<input
						type='text'
						value={newTaskName}
						onChange={(e) => setNewTaskName(e.target.value)}
						onBlur={handleSaveEdit}
						onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
						autoFocus
					/>
				) : (
					<span
						className={`task__container-list-item-content-task ${task.completed ? 'completed' : ''}`}
						onClick={() => onStartEditing(task)}>
						{task.name}
					</span>
				)}
			</div>
			<div className='task__container-list-item-button'>
				<button
					className='task__container-list-item-button-body'
					onClick={() => onDelete(task.id)}>
					<Image
						src='/assets/image/trash.svg'
						alt='Icone para deletar'
						width={24}
						height={24}
					/>
				</button>
			</div>
		</li>
	);
};

export default TaskItem;
