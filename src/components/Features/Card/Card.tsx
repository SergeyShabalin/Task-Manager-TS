import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useActions } from '@/hooks/useActions/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import Description from '@/components/Features/Card/components/Description'

import { Modal } from '@UI'
import Deadline from '@/components/Features/Card/components/Deadline'
import Header from '@/components/Features/Card/components/Header'
import Checklist from '@/components/Features/Card/components/Checklist'
import classes from './Card.module.css'

export default function Card() {
	const navigate = useNavigate()
	const {userId, boardId, cardId } = useParams()
	const cardInfo = useTypedSelector(state => state.board.cardInfo)
	const { getOneCard } = useActions()

	useEffect(() => {
		if (cardId) getOneCard(cardId)
	}, [])

	function closeModal() {
		navigate(`/user/${userId}/board/${boardId}`)
	}

	return (
		<Modal onClose={closeModal} open>
			<div className={classes.card_modal_wrapper}>
				<Header closeModal={closeModal} _id={cardInfo._id} title={cardInfo.title} />
				<Deadline _id={cardInfo._id} decisionDate={cardInfo.decisionDate} />
				<Description description={cardInfo.description} _id={cardInfo._id} />
				<Checklist
					_id={cardInfo._id}
					countTask={cardInfo.countTask}
					doneTask={cardInfo.doneTask}
					checkList={cardInfo.checkList}
				/>
			</div>
		</Modal>
	)
}
