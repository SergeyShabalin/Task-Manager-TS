import React, { useEffect, useState } from 'react'
import classes from './MiniCard.module.css'
import { Card } from '@/models/Cards'
import { Button } from '@UI/'
import { GrClose } from 'react-icons/gr'
import { useActions } from '@/hooks/useActions/useActions'
import Editor from '@Features/Editor'
import { useSelector } from 'react-redux'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

export default function MiniCard({ header, _id, countTask, doneTask }: Card) {
	const { deleteCard, changeCard } = useActions()
	// const isLoading = useTypedSelector(state => state.board.isLoading)


	function cardDelete() {
		deleteCard(_id)
	}

	function changeCardTitle(title: string) {
		const payload = {_id,title}
		changeCard(payload)
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
					isLoading={false}
					error={false}
				>
					<div className={classes.title}>{header}</div>
				</Editor>
				{/*</Link>*/}
				<div className={classes.footer}>
					{/*<span>{decisionDate}</span>*/}
					<span>{countTask}/{doneTask}</span>
					<Button variant='just_icon' icon={<GrClose />} onClick={cardDelete} />
				</div>
			</div>
		</>
	)
}
