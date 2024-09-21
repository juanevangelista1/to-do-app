import "../styles/buttons.scss";

interface ButtonProps {
	onClick: () => void;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
	return (
		<button className="button__bottom" onClick={onClick}>
			<span className="button__bottom-text">{children}</span>
		</button>
	);
};

export default Button;
