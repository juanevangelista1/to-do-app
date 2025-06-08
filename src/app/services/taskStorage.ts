import { Task, TaskStorage } from '../types/task';

class LocalStorageTaskService implements TaskStorage {
	private readonly STORAGE_KEY = 'tasks';

	saveTasks(tasks: Task[]): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
	}

	loadTasks(): Task[] {
		const storedTasks = localStorage.getItem(this.STORAGE_KEY);
		return storedTasks ? JSON.parse(storedTasks) : [];
	}
}

export const taskStorageService = new LocalStorageTaskService();
