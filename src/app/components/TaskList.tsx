import React, { useState } from "react";
import "../styles/taskList.scss";
import Image from "next/image";
import "../styles/modals.scss";

type Task = {
	id: number;
	name: string;
	completed: boolean;
};

interface TaskListProps {
	tasks: Task[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit?: (id: number, newName: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
	const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
	const [newTaskName, setNewTaskName] = useState<string>("");

	const startEditing = (task: Task) => {
		setEditingTaskId(task.id);
		setNewTaskName(task.name);
	};

	const saveEdit = (id: number) => {
		if (newTaskName.trim() !== "" && onEdit) {
			onEdit(id, newTaskName);
			setEditingTaskId(null);
		}
	};

	// Separar tarefas completas das incompletas
	const completedTasks = tasks.filter((task) => task.completed);
	const incompleteTasks = tasks.filter((task) => !task.completed);

	return (
		<section className="task__container">
			{/* Seção de Tarefas Incompletas */}
			<ul className="task__container-list">
				{incompleteTasks.map((task) => (
					<li key={task.id} className="task__container-list-item">
						<div className="task__container-list-item-content">
							<label className="custom-checkbox">
								{/* Chama a função onToggle sem afetar o comportamento de exclusão */}
								<input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
								<span className="checkmark"></span>
							</label>

							{editingTaskId === task.id ? (
								<input
									type="text"
									value={newTaskName}
									onChange={(e) => setNewTaskName(e.target.value)}
									onBlur={() => saveEdit(task.id)}
									onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
									autoFocus
								/>
							) : (
								<span
									className={`task__container-list-item-content-task ${task.completed ? "completed" : ""}`}
									onClick={() => startEditing(task)}>
									{task.name}
								</span>
							)}
						</div>
						<div className="task__container-list-item-button">
							<button className="task__container-list-item-button-body" onClick={() => onDelete(task.id)}>
								<Image src="/assets/image/trash.svg" alt="Icone para deletar" width={24} height={24} />
							</button>
						</div>
					</li>
				))}
			</ul>

			{/* Seção de Tarefas Completas */}
			{completedTasks.length > 0 && (
				<section className="completed__tasks-section">
					<ul className="task__container-list">
						{completedTasks.map((task) => (
							<li key={task.id} className="task__container-list-item">
								<div className="task__container-list-item-content">
									<label className="custom-checkbox">
										{/* Permite desmarcar uma tarefa completa */}
										<input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
										<span className="checkmark"></span>
									</label>

									{editingTaskId === task.id ? (
										<input
											type="text"
											value={newTaskName}
											onChange={(e) => setNewTaskName(e.target.value)}
											onBlur={() => saveEdit(task.id)}
											onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
											autoFocus
										/>
									) : (
										<span
											className={`task__container-list-item-content-task ${task.completed ? "completed" : ""}`}
											onClick={() => startEditing(task)}>
											{task.name}
										</span>
									)}
								</div>
								<div className="task__container-list-item-button">
									<button
										className="task__container-list-item-button-body"
										onClick={() => onDelete(task.id)}>
										<Image src="/assets/image/trash.svg" alt="Icone para deletar" width={24} height={24} />
									</button>
								</div>
							</li>
						))}
					</ul>
				</section>
			)}
		</section>
	);
};

export default TaskList;
