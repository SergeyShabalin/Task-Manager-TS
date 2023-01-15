import React, { useEffect, useState } from 'react'
import classes from './MiniCard.module.css'
import { Card } from '@/models/Cards'
import { Button } from '@UI'
import { GrClose } from 'react-icons/gr'
import { useActions } from '@/hooks/useActions/useActions'

import { Link, useLocation } from 'react-router-dom'

export default function MiniCard({ title, _id, countTask, doneTask,  }: Card) {
	const { deleteCard, changeCardOne } = useActions()
	const location = useLocation();

	function cardDelete() {
		deleteCard(_id)
	}

	function changeCardTitle(title: string) {
		const payload = { _id, title }
		const isSuccess = changeCardOne(payload)
		return isSuccess
		//TODO разобраться с именами чтобы не пересекались названия АС и экшенов смотри в action
	}

	return (
		<Link state={{ background: location }} to={`/board/63ad83c2097128dd4caad35a/card/${_id}`}>
			<div className={classes.list_card}>
				{/*<Editor*/}
				{/*	buttonSubmitTitle='Добавить'*/}
				{/*	onSubmit={changeCardTitle}*/}
				{/*	placeholder='Введите название карточки'*/}
				{/*	defaultValue={header}*/}
				{/*	errorMessage='Произошла ошибка изменения заголовка'*/}
				{/*>*/}
					<div className={classes.title}>{title}</div>
				{/*</Editor>*/}
				<div className={classes.footer}>
					<span>
						{countTask}/{doneTask}
					</span>
					<Button variant='just_icon' icon={<GrClose />} onClick={cardDelete} />
				</div>
			</div>
		</Link>
	)
}
