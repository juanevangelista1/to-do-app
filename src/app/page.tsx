"use client";

import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import Button from "./components/Button";
import AddTaskModal from "./components/AddTaskModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import "./styles/tasks.scss";

type Task = {
	id: number;
	name: string;
	completed: boolean;
};

const HomePage: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

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

	const deleteTask = (id: number) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
		updateLocalStorage(updatedTasks);
		setIsDeleteModalOpen(false);
	};

	const addTask = (taskName: string) => {
		const newTask = { id: Date.now(), name: taskName, completed: false }; // Gera um ID único
		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
		updateLocalStorage(updatedTasks);
		setIsAddModalOpen(false);
	};

	const completedTasks = tasks.filter((task) => task.completed);

	return (
		<section className="task__page">
			<div className="task__page-container">
				<div className="task__page-container-title">
					<h2 className="task__page-container-title-text">Suas tarefas de hoje</h2>
				</div>

				<TaskList
					tasks={tasks.filter((task) => !task.completed)}
					onToggle={toggleTaskCompletion}
					onDelete={(id) => {
						setTaskToDelete(id);
						setIsDeleteModalOpen(true);
					}}
				/>

				<div className="task__page-container-empty">
					{tasks.filter((task) => !task.completed).length === 0 && (
						<p className="task__page-container-empty-text">
							Vamos lá! Crie sua primeira tarefa e comece a organizar seu dia! 🚀
						</p>
					)}
				</div>

				{completedTasks.length > 0 && (
					<section className="completed__tasks-section">
						<div className="completed__tasks-section-title">
							<h2 className="completed__tasks-section-title-text">Tarefas finalizadas</h2>
						</div>
						<TaskList
							tasks={completedTasks}
							onToggle={toggleTaskCompletion}
							onDelete={(id) => {
								setTaskToDelete(id);
								setIsDeleteModalOpen(true);
							}}
						/>
					</section>
				)}

				{isAddModalOpen && <AddTaskModal onClose={() => setIsAddModalOpen(false)} onAdd={addTask} />}
				{isDeleteModalOpen && taskToDelete !== null && (
					<ConfirmDeleteModal
						onDelete={() => deleteTask(taskToDelete)}
						onCancel={() => setIsDeleteModalOpen(false)}
					/>
				)}
			</div>

			<div className="task__page-bottom">
				<Button onClick={() => setIsAddModalOpen(true)}>Adicionar nova tarefa</Button>
			</div>
		</section>
	);
};

export default HomePage;
