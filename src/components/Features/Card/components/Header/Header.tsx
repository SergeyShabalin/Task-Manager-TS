import React from "react";
import { AiOutlineClose, AiOutlineCreditCard } from "react-icons/ai";

import { Button } from "@UI";
import classes from "./Header.module.css";
import { Card } from '@/models/Cards'

interface HeaderProps {
	closeModal: () => void
	title: string
}
// type HeaderProps1 = Pick<Card, 'title'> & {
// 	closeModal: () => void
// }

export default function Header({ closeModal, title }: HeaderProps) {
	return (
		<div className={classes.header}>
			<div className={classes.title_wrapper}>
				<div className={classes.icon_wrapper}>
					<AiOutlineCreditCard className={classes.icons} />
				</div>
				<h3 className={classes.title}>{title}</h3>
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