import React, { useState } from 'react'
import classes from './MiniCard.module.css'
import { Link } from 'react-router-dom'

import { Card as CardT } from '@/models/Cards'
import { Button } from '@/components/UI'
import { GrClose } from 'react-icons/gr'
import { useActions } from '@/hooks/useActions/useActions'
import { BiEditAlt } from 'react-icons/all'
import Editor from '@/components/Features/Editor'

export default function Card({ header, _id }: CardT) {
	const { deleteCard, changeTitle } = useActions()

	function cardDelete() {
		deleteCard(_id)
	}

	function changeCardTitle(title: string) {
		changeTitle(_id, title)
	}

	return (
		<>
			<div className={classes.list_card}>
				{/*<Link*/}
				{/*	className={classes.link}*/}
				{/*	state={{ background: location }}*/}
				{/*	to={`/board/${'boardId'}/card/${'cardId'}`}*/}
				{/*>*/}
				<Editor
					buttonSubmitTitle='Добавить'
					onSubmit={changeCardTitle}
					placeholder='Введите название карточки'
					isAdd={false}
				>
					<div className={classes.title}>{header}</div>
				</Editor>
				{/*</Link>*/}
				<div className={classes.footer}>
					decisionDate Checkout
					<Button variant='just_icon' icon={<GrClose />} onClick={cardDelete} />
				</div>
			</div>
		</>
	)
}
