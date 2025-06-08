import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskItemProps } from '../types/task';
import TaskItem from './TaskItem';
import '../styles/taskList.scss';

const SortableTaskItem: React.FC<TaskItemProps> = (props) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: props.task.id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		cursor: 'grab',
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}>
			<TaskItem {...props} />
		</div>
	);
};

export default SortableTaskItem;
