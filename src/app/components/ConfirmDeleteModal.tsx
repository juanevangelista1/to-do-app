interface ConfirmDeleteModalProps {
	onDelete: () => void;
	onCancel: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onDelete, onCancel }) => {
	return (
		<section className="modal__container">
			<div className="modal__container-content">
				<div className="modal__container-content-title">
					<h2 className="modal__container-content-title-text">Deletar tarefa</h2>
				</div>
				<div className="modal__container-content-middle">
					<span className="modal__container-content-middle-title">
						Tem certeza que você deseja deletar essa tarefa?
					</span>
				</div>
				<div className="modal__container-content-buttons">
					<button className="modal__container-content-buttons-cancel" onClick={onCancel}>
						<span className="modal__container-content-buttons-cancel-text">Cancelar</span>
					</button>
					<button className="modal__container-content-buttons-delete" onClick={onDelete}>
						<span className="modal__container-content-buttons-delete-text">Deletar</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default ConfirmDeleteModal;
