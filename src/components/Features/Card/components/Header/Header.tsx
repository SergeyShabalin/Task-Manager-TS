import React from 'react'
import { AiOutlineClose, AiOutlineCreditCard } from 'react-icons/ai'

import { Button } from '@UI'
import classes from './Header.module.css'
import { Editor } from '@Features'
import { useActions } from '@/hooks/useActions/useActions'
import { Card } from '@/models/Cards'

type CardProps = Pick <Card, 'title'|'_id'>

interface HeaderProps extends CardProps{
	closeModal: () => void
}

export default function Header({ closeModal, title, _id }: HeaderProps) {
	const { changeCard } = useActions()

	function changeCardTitle(title: string) {
		const payload = { _id, title }
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
					rows={1}
					variant='large'
					color='outlined'
				>
					<h3 className={classes.title}>{title}</h3>
				</Editor>
			</div>
			<div className={classes.form_close}>
				<Button onClick={closeModal} variant='just_icon' icon={<AiOutlineClose />} />
			</div>
		</div>
	)
}
