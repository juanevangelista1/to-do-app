import { useState, useRef, useEffect } from 'react';
import '../styles/modals.scss';

interface AddTaskModalProps {
	onClose: () => void;
	onAdd: (taskName: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onAdd }) => {
	const [taskName, setTaskName] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// Focar no input quando o modal abrir
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const handleAdd = () => {
		const trimmedName = taskName.trim();
		if (trimmedName) {
			onAdd(trimmedName);
			setTaskName('');
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAdd();
		} else if (e.key === 'Escape') {
			onClose();
		}
	};

	return (
		<section className='modal__container'>
			<div className='modal__container-content'>
				<div className='modal__container-content-title'>
					<h2 className='modal__container-content-title-text'>Nova Tarefa</h2>
				</div>
				<div className='modal__container-content-middle'>
					<span className='modal__container-content-middle-title'>Título</span>
					<input
						ref={inputRef}
						className='modal__container-content-middle-body'
						type='text'
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Digite o título da tarefa'
						autoComplete='off'
					/>
				</div>
				<div className='modal__container-content-buttons'>
					<button
						className='modal__container-content-buttons-cancel'
						onClick={onClose}
						type='button'>
						<span className='modal__container-content-buttons-cancel-text'>Cancelar</span>
					</button>
					<button
						className='modal__container-content-buttons-add'
						onClick={handleAdd}
						type='button'
						disabled={!taskName.trim()}>
						<span className='modal__container-content-buttons-add-text'>Adicionar</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default AddTaskModal;
