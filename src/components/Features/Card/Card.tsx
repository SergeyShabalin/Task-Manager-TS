import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useActions } from '@/hooks/useActions/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import Description from '@/components/Features/Card/components/Description'
import { Loader, Modal } from '@UI'
import Deadline from '@/components/Features/Card/components/Deadline'
import Header from '@/components/Features/Card/components/Header'
import Checklist from '@/components/Features/Card/components/Checklist'
import classes from './Card.module.css'
import CurrentUsers from '@/components/Features/Card/components/CurrentUsers'
import Sidebar from '@/components/Features/Card/components/Sidebar'

export default function Card() {
	const navigate = useNavigate()
	const { userId, boardId, cardId } = useParams()
	const cardInfo = useTypedSelector(state => state.board.cardInfo)
	const isLoading = useTypedSelector(state => state.board.isLoadingCard)
	const { getOneCard, closeCard } = useActions()


	useEffect(() => {
		if (cardId) getOneCard(cardId)
	}, [])

	useEffect(() => {

	}, [])

	function closeModal() {
		navigate(`/user/${userId}/board/${boardId}`)
		closeCard()
	}

	return (
		<Modal onClose={closeModal} open>
			<div className={classes.card_modal_wrapper}>
				{isLoading && (
					<div className={classes.loader}>
						<Loader color='lds-black' variant='local' />
					</div>
				)}
				<>
					<Header closeModal={closeModal} _id={cardInfo._id} title={cardInfo.title} />
					<div className={classes.content}>
					<div className={classes.main_components}>
						<Deadline _id={cardInfo._id} decisionDate={cardInfo.decisionDate} />
						<CurrentUsers />
						<Description description={cardInfo.description} _id={cardInfo._id} />
						<Checklist
							_id={cardInfo._id}
							countTask={cardInfo.countTask}
							doneTask={cardInfo.doneTask}
							checkList={cardInfo.checkList}
						/>
					</div>
					<Sidebar/>
					</div>
				</>
			</div>
		</Modal>
	)
}
