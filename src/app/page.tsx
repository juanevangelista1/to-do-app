"use client";

import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import Button from "./components/Button";
import "./styles/tasks.scss";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

type Task = {
	id: number;
	name: string;
	completed: boolean;
};

const HomePage: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newTaskName, setNewTaskName] = useState<string>("");

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [taskToDeleteId, setTaskToDeleteId] = useState<number | null>(null);

	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks));
		}
	}, []);

	const updateLocalStorage = (tasks: Task[]) => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	};

	const toggleTaskCompletion = (id: number) => {
		const updatedTasks = tasks.map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task
		);
		setTasks(updatedTasks);
		updateLocalStorage(updatedTasks);
	};

	const handleDeleteClick = (taskId: number) => {
		setTaskToDeleteId(taskId);
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (taskToDeleteId !== null) {
			const updatedTasks = tasks.filter((t) => t.id !== taskToDeleteId);
			setTasks(updatedTasks);
			updateLocalStorage(updatedTasks);
			setTaskToDeleteId(null);
		}
		setIsDeleteModalOpen(false);
	};

	const handleCancelDelete = () => {
		setIsDeleteModalOpen(false);
		setTaskToDeleteId(null);
	};

	const addTask = () => {
		if (newTaskName.trim() === "") return;
		const newTask = { id: Date.now(), name: newTaskName, completed: false };
		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
		updateLocalStorage(updatedTasks);
		setNewTaskName("");
		setIsAddModalOpen(false);
	};

	const editTaskName = (id: number, newName: string) => {
		setTasks(tasks.map((task) => (task.id === id ? { ...task, name: newName } : task)));
		updateLocalStorage(tasks);
	};

	return (
		<section className="task__page">
			<div className="task__page-container">
				<h2 className="task__page-container-title-text">Suas tarefas de hoje</h2>

				<TaskList
					tasks={tasks.filter((task) => !task.completed)}
					onToggle={toggleTaskCompletion}
					onDelete={handleDeleteClick}
					onEdit={editTaskName}
				/>
			</div>

			<div className="task__page-bottom">
				<Button onClick={() => setIsAddModalOpen(true)}>Adicionar nova tarefa</Button>
			</div>

			{isAddModalOpen && (
				<div className="modal__container">
					<div className="modal__container-content">
						<div className="modal__container-content-title">
							<h2 className="modal__container-content-title-text">Adicionar Nova Tarefa</h2>
						</div>
						<div className="modal__container-content-middle">
							<input
								className="modal__container-content-middle-body"
								type="text"
								value={newTaskName}
								onChange={(e) => setNewTaskName(e.target.value)}
								placeholder="Digite o nome da tarefa"
							/>
						</div>
						<div className="modal__container-content-buttons">
							<button className="modal__container-content-buttons-add" onClick={addTask}>
								<span className="modal__container-content-buttons-add-text">Salvar Tarefa</span>
							</button>
							<button
								className="modal__container-content-buttons-cancel"
								onClick={() => setIsAddModalOpen(false)}>
								<span className="modal__container-content-buttons-cancel-text">Cancelar</span>
							</button>
						</div>
					</div>
				</div>
			)}

			{isDeleteModalOpen && (
				<ConfirmDeleteModal onDelete={handleConfirmDelete} onCancel={handleCancelDelete} />
			)}
		</section>
	);
};

export default HomePage;
