"use client";
import { useEffect, useState } from "react";
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
	const [username, setUsername] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newUsername, setNewUsername] = useState("");

	useEffect(() => {
		const storedUsername = localStorage.getItem("username");

		if (storedUsername) {
			setUsername(storedUsername);
		} else {
			setIsModalOpen(true);
		}
	}, []);

	const handleSaveUsername = () => {
		if (newUsername.trim() !== "") {
			localStorage.setItem("username", newUsername);
			setUsername(newUsername);
			setIsModalOpen(false);
		}
	};

	return (
		<header className="header">
			<section className="header__container">
				<div className="header__container-logo">
					<Image src="/assets/image/logo.svg" width={150} height={36} alt="Logo FocalPoint" />
				</div>
				<div className="header__container-user-name">
					<span className="header__container-user-name-text">
						{username ? `Bem-vindo de volta, ${username}` : "Bem-vindo de volta!"}
					</span>
				</div>
				<div className="header__container-date-info">{getCurrentDate()}</div>
			</section>

			{isModalOpen && (
				<section className="modal__container">
					<div className="modal__container-content">
						<div className="modal__container-title">
							<h2 className="modal__container-title-text">Como você gostaria de ser chamado?</h2>
						</div>
						<div className="modal__container-content-middle">
							<input
								className="modal__container-content-middle-body"
								type="text"
								value={newUsername}
								onChange={(e) => setNewUsername(e.target.value)}
								placeholder="Digite seu nome"
							/>
						</div>
						<div className="modal__container-content-button">
							<button onClick={handleSaveUsername} className="modal__container-content-button-add">
								<span className="modal__container-content-button-add-text">Salvar Nome</span>
							</button>
						</div>
					</div>
				</section>
			)}
		</header>
	);
};

export default Header;
