import React, { useState } from "react";
import "../styles/taskList.scss";
import Image from "next/image";

type Task = {
	id: number;
	name: string;
	completed: boolean;
};

interface TaskListProps {
	tasks: Task[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, newName: string) => void; // Função para editar tarefa
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
	// Estado local para a tarefa que está sendo editada
	const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
	const [newTaskName, setNewTaskName] = useState<string>("");

	// Função para iniciar a edição
	const startEditing = (task: Task) => {
		setEditingTaskId(task.id);
		setNewTaskName(task.name);
	};

	// Função para salvar a edição
	const saveEdit = (id: number) => {
		if (newTaskName.trim() !== "") {
			onEdit(id, newTaskName);
			setEditingTaskId(null);
		}
	};

	return (
		<section className="task__container">
			<ul className="task__container-list">
				{tasks.map((task) => (
					<li key={task.id} className="task__container-list-item">
						<div className="task__container-list-item-content">
							<label className="custom-checkbox">
								<input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
								<span className="checkmark"></span>
							</label>

							{editingTaskId === task.id ? (
								<input
									type="text"
									value={newTaskName}
									onChange={(e) => setNewTaskName(e.target.value)}
									onBlur={() => saveEdit(task.id)} // Salva a edição ao perder foco
									onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)} // Salva ao pressionar Enter
									autoFocus
								/>
							) : (
								<span
									className={`task__container-list-item-content-task ${task.completed ? "completed" : ""}`}
									onClick={() => startEditing(task)} // Duplo clique para editar
								>
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
		</section>
	);
};

export default TaskList;
