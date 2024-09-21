import "../styles/header.scss";
import Image from "next/image";

const getCurrentDate = () => {
	const today = new Date();
	const dayNames = [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	];
	const monthNames = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	const day = dayNames[today.getDay()];
	const dayOfMonth = today.getDate().toString().padStart(2, "0");
	const month = monthNames[today.getMonth()];
	const year = today.getFullYear();

	const formattedDate = `${dayOfMonth} de ${month} de ${year}`;

	return `${day}, ${formattedDate}`;
};

const Header = () => {
	return (
		<header className="header">
			<section className="header__container">
				<div className="header__container-logo">
					<Image src="/assets/image/logo.svg" width={150} height={36} alt="Logo FocalPoint" />
				</div>
				<div className="header__container-user-name">
					<span className="header__container-user-name-text">Bem-vindo de volta, Marcus</span>
				</div>
				<div className="header__container-date-info">{getCurrentDate()}</div>
			</section>
		</header>
	);
};

export default Header;
