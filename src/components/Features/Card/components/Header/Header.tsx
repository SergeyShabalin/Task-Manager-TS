import React from "react";
import { AiOutlineClose, AiOutlineCreditCard } from "react-icons/ai";

import { Button } from "@UI";
import classes from "./Header.module.css";
import { Editor } from '@Features'
import { useActions } from '@/hooks/useActions/useActions'

interface HeaderProps {
	closeModal: () => void
	title: string
	cardId: string
}

export default function Header({ closeModal, title, cardId }: HeaderProps) {

	const { changeCard } = useActions()

	function changeCardTitle(value: string) {
		const payload = { _id: cardId, title: value }
		const isSuccess = changeCard(payload)
		return isSuccess
	}

	return (
		<div className={classes.header}>
			<div className={classes.title_wrapper}>
				<div className={classes.icon_wrapper}>
					<AiOutlineCreditCard className={classes.icons} />
				</div>
				<Editor
					buttonSubmitTitle='Сохранить'
					onSubmit={changeCardTitle}
					placeholder='Введите название карточки'
					defaultValue={title}
				>
				<h3 className={classes.title}>{title}</h3>
				</Editor>

			</div>
			<div className={classes.form_close}>
				<Button
					onClick={closeModal}
					variant="just_icon"
					icon={<AiOutlineClose />}
				/>
			</div>
		</div>
	);
};