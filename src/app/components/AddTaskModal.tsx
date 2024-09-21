import { useState } from "react";
import "../styles/modals.scss";

interface AddTaskModalProps {
	onClose: () => void;
	onAdd: (taskName: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onAdd }) => {
	const [taskName, setTaskName] = useState<string>("");

	const handleAdd = () => {
		if (taskName) {
			onAdd(taskName);
			setTaskName("");
		}
	};

	return (
		<section className="modal__container">
			<div className="modal__container-content">
				<div className="modal__container-content-title">
					<h2 className="modal__container-content-title-text">Nova Tarefa</h2>
				</div>
				<div className="modal__container-content-middle">
					<span className="modal__container-content-middle-title">Título</span>
					<input
						className="modal__container-content-middle-body"
						type="text"
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						placeholder="Digite"
					/>
				</div>
				<div className="modal__container-content-buttons">
					<button className="modal__container-content-buttons-cancel" onClick={onClose}>
						<span className="modal__container-content-buttons-cancel-text">Cancelar</span>
					</button>
					<button className="modal__container-content-buttons-add" onClick={handleAdd}>
						<span className="modal__container-content-buttons-add-text">Adicionar</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default AddTaskModal;
