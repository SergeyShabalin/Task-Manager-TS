import React, { useEffect } from 'react'
import { Button, Modal } from '@UI'
import { useNavigate, useParams } from 'react-router-dom'

import classes from './Card.module.css'
import Header from './components/Header/Header'
import { useActions } from '@/hooks/useActions/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import Description from '@/components/Features/Card/components/Description'
import Checklist from '@/components/Features/Card/components/Checklist'
import { Editor } from '@/components/Features'

export default function Card() {
	const navigate = useNavigate()
	const { boardId, cardId } = useParams()
	const cardInfo = useTypedSelector(state => state.board.cardInfo)
	const { getOneCard, addNewTask } = useActions()


	useEffect(() => {
		if (cardId) getOneCard(cardId)
	}, [])

	const CheckLists = cardInfo?.checkList.map(checkItem => (
		<Checklist key={checkItem._id} {...checkItem} />
	))

	function closeModal() {
		navigate(`/board/${boardId}`)
	}

	function addTask(value: string) {
		if(cardId) return addNewTask(cardId, value)
	}

	return (
		<Modal onClose={closeModal} open>
			<div className={classes.card_modal_wrapper}>
				<Header closeModal={closeModal} title={cardInfo.title} />
				<Description description='описание' />
				{CheckLists}
				<Editor
					buttonSubmitTitle='Добавить задачу'
					onSubmit={addTask}
					placeholder='Введите название задачи'
				>
					<Button variant='outlined' color='primary' title='Добавить карточку' />
				</Editor>
			</div>
		</Modal>
	)
}
