'use client';
import Link from 'next/link';
import '../styles/footer.scss';

export const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className='footer'>
			<div className='footer__container'>
				<div className='footer__container-content'>
					<span className='footer__container-content-text'>
						Desenvolvido com muito 💙 por
						<Link
							href='https://www.linkedin.com/in/juan-evangelista-desenvolvedor/'
							target='_blank'
							rel='noopener noreferrer'
							className='footer__container-content-contact'>
							Juan Evangelista
						</Link>
					</span>
					<span className='footer__container-content-copyright'>© {currentYear}</span>
				</div>
			</div>
		</footer>
	);
};
