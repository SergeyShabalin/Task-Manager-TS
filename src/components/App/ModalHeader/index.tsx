import React from 'react'
import { AiOutlineClose, AiOutlineCreditCard } from 'react-icons/ai'

import Button from '@/components/UI/Button'
import classes from './Header.module.css'

interface ModalHeaderTypes {
	closeModal: () => void
	title: string
}

export function ModalHeader({ closeModal, title }: ModalHeaderTypes) {
	return (
		<div className={classes.header}>
			<div className={classes.title_wrapper}>
				<div className={classes.icon_wrapper}>
					<AiOutlineCreditCard className={classes.icons} />
				</div>
				<h3 className={classes.title}>{title}</h3>
			</div>
			<div className={classes.form_close}>
				<Button onClick={closeModal} variant='just_icon' icon={<AiOutlineClose />} />
			</div>
		</div>
	)
}
