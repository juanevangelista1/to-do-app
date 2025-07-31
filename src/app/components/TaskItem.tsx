import React, { useCallback, useRef, useEffect } from 'react';
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
	const inputRef = useRef<HTMLInputElement>(null);

	// Atualiza o nome da tarefa quando a tarefa mudar
	useEffect(() => {
		setNewTaskName(task.name);
	}, [task.name]);

	// Foca no input quando entrar em modo de edição
	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			// Seleciona todo o texto para facilitar a edição
			inputRef.current.select();
		}
	}, [isEditing]);

	const handleSaveEdit = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			// Remove espaços extras no início e fim, mas mantém espaços entre palavras
			const trimmedName = newTaskName.trim();
			if (trimmedName) {
				onSaveEdit(task.id, trimmedName);
			} else {
				// Se o nome estiver vazio, restaura o nome original
				setNewTaskName(task.name);
			}
		},
		[newTaskName, task.id, task.name, onSaveEdit]
	);

	const handleCancelEdit = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			// Restaura o nome original e notifica o componente pai para parar a edição
			setNewTaskName(task.name);
			onStartEditing(task);
		},
		[task, onStartEditing]
	);

	const handleToggle = useCallback(
		(e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			if (isEditing) {
				handleCancelEdit(e as React.MouseEvent);
			}
			onToggle(task.id);
		},
		[task.id, onToggle, isEditing, handleCancelEdit]
	);

	const handleDelete = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			if (isEditing) {
				handleCancelEdit(e);
			}
			onDelete(task.id);
		},
		[task.id, onDelete, isEditing, handleCancelEdit]
	);

	const handleStartEditing = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			if (!isEditing) {
				onStartEditing(task);
			}
		},
		[task, onStartEditing, isEditing]
	);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		// Permite qualquer caractere, incluindo espaços
		setNewTaskName(e.target.value);
	}, []);

	const handleInputClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			e.stopPropagation();
			if (e.key === 'Escape') {
				handleCancelEdit(e as unknown as React.MouseEvent);
			}
		},
		[handleCancelEdit]
	);

	return (
		<li
			className='task__container-list-item'
			onClick={(e) => e.stopPropagation()}>
			<div className='task__container-list-item-content'>
				<div className='task__container-list-item-priority'>
					<span
						className={`task__container-list-item-priority-indicator priority-${task.priority} animate-subtle-blink`}
						title={`Prioridade ${
							task.priority === 'low' ? 'baixa' : task.priority === 'medium' ? 'média' : 'alta'
						}`}></span>
				</div>
				<label className='custom-checkbox'>
					<input
						type='checkbox'
						checked={task.completed}
						onChange={handleToggle}
						aria-label={`Marcar tarefa "${task.name}" como ${
							task.completed ? 'não concluída' : 'concluída'
						}`}
					/>
					<span
						className='checkmark'
						onClick={(e) => handleToggle(e as React.MouseEvent)}></span>
				</label>

				{isEditing ? (
					<div
						className='task__container-list-item-edit'
						onClick={handleInputClick}>
						<input
							ref={inputRef}
							type='text'
							value={newTaskName}
							onChange={handleInputChange}
							onClick={handleInputClick}
							onKeyDown={handleKeyDown}
							className='task__container-list-item-content-input'
							aria-label='Editar nome da tarefa'
							pattern='.*'
							maxLength={100}
						/>
						<div className='task__container-list-item-edit-buttons'>
							<button
								className='task__container-list-item-edit-buttons-save'
								onClick={handleSaveEdit}
								type='button'
								aria-label='Salvar alterações'>
								✔️
							</button>
							<button
								className='task__container-list-item-edit-buttons-cancel'
								onClick={handleCancelEdit}
								type='button'
								aria-label='Cancelar edição'>
								❌
							</button>
						</div>
					</div>
				) : (
					<span
						className={`task__container-list-item-content-task ${task.completed ? 'completed' : ''}`}
						onClick={handleStartEditing}
						onDoubleClick={handleStartEditing}
						role='button'
						tabIndex={0}
						aria-label={`Editar tarefa "${task.name}"`}>
						{task.name}
					</span>
				)}
			</div>
			{!isEditing && (
				<div className='task__container-list-item-button'>
					<button
						className='task__container-list-item-button-body'
						onClick={handleDelete}
						aria-label={`Excluir tarefa "${task.name}"`}
						type='button'>
						<Image
							src='/assets/image/trash.svg'
							alt=''
							width={24}
							height={24}
						/>
					</button>
				</div>
			)}
		</li>
	);
};

export default TaskItem;
