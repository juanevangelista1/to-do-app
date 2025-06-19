'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Task, Priority } from './types/task';
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
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadTasks = () => {
			try {
				const loadedTasks = taskStorageService.loadTasks();
				const tasksWithDefaults = loadedTasks.map((task: Task, index: number) => ({
					...task,
					order: task.order ?? index,
					date: task.date ?? formatDate(new Date()),
					priority: task.priority ?? 'medium',
				}));
				const sortedTasks = [...tasksWithDefaults].sort((a: Task, b: Task) => a.order - b.order);
				setTasks(sortedTasks);
			} catch (error) {
				console.error('Erro ao carregar tarefas:', error);
				setTasks([]);
			} finally {
				setIsLoading(false);
			}
		};

		loadTasks();
	}, []);

	const updateTasks = useCallback((updatedTasks: Task[]): void => {
		try {
			setTasks(updatedTasks);
			taskStorageService.saveTasks(updatedTasks);
		} catch (error) {
			console.error('Erro ao salvar tarefas:', error);
		}
	}, []);

	const handleReorder = useCallback(
		(reorderedTasks: Task[]): void => {
			updateTasks(reorderedTasks);
		},
		[updateTasks]
	);

	const toggleTaskCompletion = useCallback((id: number): void => {
		setTasks((prevTasks) => {
			const updatedTasks = prevTasks.map((task: Task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			);
			taskStorageService.saveTasks(updatedTasks);
			return updatedTasks;
		});
	}, []);

	const deleteTask = useCallback((id: number): void => {
		setTasks((prevTasks) => {
			const updatedTasks = prevTasks.filter((task: Task) => task.id !== id);
			taskStorageService.saveTasks(updatedTasks);
			return updatedTasks;
		});
		setIsDeleteModalOpen(false);
	}, []);

	const addTask = useCallback(
		(taskName: string, priority: Priority): void => {
			setTasks((prevTasks) => {
				const newTask: Task = {
					id: Date.now(),
					name: taskName,
					completed: false,
					order: prevTasks.filter((t: Task) => t.date === formatDate(selectedDate)).length,
					date: formatDate(selectedDate),
					priority: priority,
				};
				const updatedTasks = [...prevTasks, newTask];
				taskStorageService.saveTasks(updatedTasks);
				return updatedTasks;
			});
			setIsAddModalOpen(false);
		},
		[selectedDate]
	);

	const editTaskName = useCallback((id: number, newName: string): void => {
		setTasks((prevTasks) => {
			const updatedTasks = prevTasks.map((task: Task) =>
				task.id === id ? { ...task, name: newName } : task
			);
			taskStorageService.saveTasks(updatedTasks);
			return updatedTasks;
		});
	}, []);

	const handleDateSelect = useCallback((date: Date): void => {
		setSelectedDate(date);
	}, []);

	// Função utilitária para ordenar por prioridade
	function sortByPriority(tasks: Task[]): Task[] {
		const priorityOrder = { high: 0, medium: 1, low: 2 };
		return [...tasks].sort((a, b) => {
			if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
				return priorityOrder[a.priority] - priorityOrder[b.priority];
			}
			return a.order - b.order;
		});
	}

	const tasksForSelectedDate = sortByPriority(
		tasks.filter((task: Task) => task.date === formatDate(selectedDate))
	);
	const incompleteTasks = tasksForSelectedDate.filter((task: Task) => !task.completed);
	const completedTasks = tasksForSelectedDate.filter((task: Task) => task.completed);

	if (isLoading) {
		return (
			<section className='task__page'>
				<div className='task__page-container'>
					<p>Carregando tarefas...</p>
				</div>
			</section>
		);
	}

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
						O TO DO App está aqui para te ajudar a organizar o seu dia! Vamos lá! 🚀
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
						onAdd={(taskName, priority) => addTask(taskName, priority)}
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
