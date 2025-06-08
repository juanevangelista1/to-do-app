'use client';

import React, { useEffect, useState } from 'react';
import { Task } from './types/task';
import TaskList from './components/TaskList';
import Button from './components/Button';
import AddTaskModal from './components/AddTaskModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import WeekCalendar from './components/WeekCalendar';
import { taskStorageService } from './services/taskStorage';
import { formatDate, formatSelectedDate } from './utils/dateUtils';
import './styles/tasks.scss';

const HomePage: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

	useEffect(() => {
		const loadedTasks = taskStorageService.loadTasks();
		// Garantir que todas as tarefas tenham uma ordem e data
		const tasksWithDefaults = loadedTasks.map((task: Task, index: number) => ({
			...task,
			order: task.order ?? index,
			date: task.date ?? formatDate(new Date()),
		}));
		// Ordenar as tarefas pela ordem
		const sortedTasks = [...tasksWithDefaults].sort((a: Task, b: Task) => a.order - b.order);
		setTasks(sortedTasks);
	}, []);

	const updateTasks = (updatedTasks: Task[]): void => {
		setTasks(updatedTasks);
		taskStorageService.saveTasks(updatedTasks);
	};

	const handleReorder = (reorderedTasks: Task[]): void => {
		updateTasks(reorderedTasks);
	};

	const toggleTaskCompletion = (id: number): void => {
		const updatedTasks = tasks.map((task: Task) =>
			task.id === id ? { ...task, completed: !task.completed } : task
		);
		updateTasks(updatedTasks);
	};

	const deleteTask = (id: number): void => {
		const updatedTasks = tasks.filter((task: Task) => task.id !== id);
		updateTasks(updatedTasks);
		setIsDeleteModalOpen(false);
	};

	const addTask = (taskName: string): void => {
		const newTask: Task = {
			id: Date.now(),
			name: taskName,
			completed: false,
			order: tasks.filter((t: Task) => t.date === formatDate(selectedDate)).length,
			date: formatDate(selectedDate),
		};
		const updatedTasks = [...tasks, newTask];
		updateTasks(updatedTasks);
		setIsAddModalOpen(false);
	};

	const editTaskName = (id: number, newName: string): void => {
		const updatedTasks = tasks.map((task: Task) =>
			task.id === id ? { ...task, name: newName } : task
		);
		updateTasks(updatedTasks);
	};

	const handleDateSelect = (date: Date): void => {
		setSelectedDate(date);
	};

	const tasksForSelectedDate = tasks.filter((task: Task) => task.date === formatDate(selectedDate));
	const incompleteTasks = tasksForSelectedDate.filter((task: Task) => !task.completed);
	const completedTasks = tasksForSelectedDate.filter((task: Task) => task.completed);

	return (
		<section className='task__page'>
			<div className='task__page-container'>
				<WeekCalendar
					selectedDate={selectedDate}
					onDateSelect={handleDateSelect}
				/>

				<div className='task__page-container-title'>
					<h2 className='task__page-container-title-text'>
						Tarefas para {formatSelectedDate(selectedDate)}
					</h2>
				</div>

				<TaskList
					tasks={incompleteTasks}
					onToggle={toggleTaskCompletion}
					onDelete={(id) => {
						setTaskToDelete(id);
						setIsDeleteModalOpen(true);
					}}
					onEdit={editTaskName}
					showCompleted={false}
					onReorder={handleReorder}
				/>

				{incompleteTasks.length === 0 && (
					<p className='completed__tasks-section-title-text'>
						Vamos lá! Crie sua próxima tarefa e comece a organizar seu dia! 🚀
					</p>
				)}

				{completedTasks.length > 0 && (
					<section className='completed__tasks-section'>
						<div className='completed__tasks-section-title'>
							<h2 className='completed__tasks-section-title-text'>Tarefas finalizadas</h2>
						</div>
						<TaskList
							tasks={completedTasks}
							onToggle={toggleTaskCompletion}
							onDelete={(id) => {
								setTaskToDelete(id);
								setIsDeleteModalOpen(true);
							}}
							showCompleted={true}
						/>
					</section>
				)}

				{isAddModalOpen && (
					<AddTaskModal
						onClose={() => setIsAddModalOpen(false)}
						onAdd={addTask}
					/>
				)}
				{isDeleteModalOpen && taskToDelete !== null && (
					<ConfirmDeleteModal
						onDelete={() => deleteTask(taskToDelete)}
						onCancel={() => setIsDeleteModalOpen(false)}
					/>
				)}
			</div>

			<div className='task__page-bottom'>
				<Button onClick={() => setIsAddModalOpen(true)}>Adicionar nova tarefa</Button>
			</div>
		</section>
	);
};

export default HomePage;
