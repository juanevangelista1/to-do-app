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

	// Carrega as tarefas do localStorage ao montar o componente
	useEffect(() => {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks));
		}
	}, []);

	// Atualiza o localStorage sempre que as tarefas mudam
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	// Função genérica para alterar o estado dos modais
	const toggleModal = (
		modalSetter: React.Dispatch<React.SetStateAction<boolean>>,
		value: boolean
	) => {
		modalSetter(value);
	};

	// Funções para manipulação de tarefas
	const toggleTaskCompletion = (id: number) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
		);
	};

	const deleteTask = (id: number) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
		setIsDeleteModalOpen(false);
	};

	const addTask = (taskName: string) => {
		const newTask = { id: Date.now(), name: taskName, completed: false };
		setTasks((prevTasks) => [...prevTasks, newTask]);
		toggleModal(setIsAddModalOpen, false);
	};

	const editTaskName = (id: number, newName: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === id ? { ...task, name: newName } : task))
		);
	};

	// Filtrando tarefas pendentes e completadas
	const pendingTasks = tasks.filter((task) => !task.completed);
	const completedTasks = tasks.filter((task) => task.completed);

	return (
		<section className="task__page">
			<div className="task__page-container">
				<h2 className="task__page-container-title-text">Suas tarefas de hoje</h2>

				<TaskList
					tasks={pendingTasks}
					onToggle={toggleTaskCompletion}
					onDelete={(id) => {
						setTaskToDelete(id);
						toggleModal(setIsDeleteModalOpen, true);
					}}
					onEdit={editTaskName}
				/>

				{/* Mostrar mensagem quando não houver tarefas pendentes */}
				{/* {pendingTasks.length === 0 && (
					<p className="task__page-container-empty-text">
						Vamos lá! Crie sua primeira tarefa e comece a organizar seu dia! 🚀
					</p>
				)} */}

				{/* Mostrar tarefas completadas */}
				{completedTasks.length > 0 && (
					<section className="completed__tasks-section">
						<h2 className="completed__tasks-section-title-text">Tarefas finalizadas</h2>
						<TaskList
							tasks={completedTasks}
							onToggle={toggleTaskCompletion}
							onDelete={(id) => {
								setTaskToDelete(id);
								toggleModal(setIsDeleteModalOpen, true);
							}}
							onEdit={editTaskName}
						/>
					</section>
				)}

				{/* Modais para adicionar e deletar tarefas */}
				{isAddModalOpen && (
					<AddTaskModal onClose={() => toggleModal(setIsAddModalOpen, false)} onAdd={addTask} />
				)}
				{isDeleteModalOpen && taskToDelete !== null && (
					<ConfirmDeleteModal
						onDelete={() => deleteTask(taskToDelete)}
						onCancel={() => toggleModal(setIsDeleteModalOpen, false)}
					/>
				)}
			</div>

			<div className="task__page-bottom">
				<Button onClick={() => toggleModal(setIsAddModalOpen, true)}>Adicionar nova tarefa</Button>
			</div>
		</section>
	);
};

export default HomePage;
