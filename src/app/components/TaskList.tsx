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
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
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
							<span
								className={`task__container-list-item-content-task ${task.completed ? "completed" : ""}`}>
								{task.name}
							</span>
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
