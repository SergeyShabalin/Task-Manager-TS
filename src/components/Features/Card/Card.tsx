import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useActions } from '@/hooks/useActions/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import Description from '@/components/Features/Card/components/Description'
import { Button, Loader, Modal } from '@UI'
import Deadline from '@/components/Features/Card/components/Deadline'
import Header from '@/components/Features/Card/components/Header'
import Checklist from '@/components/Features/Card/components/Checklist'
import classes from './Card.module.css'
import CurrentUsers from '@/components/Features/Card/components/CurrentUsers'
import Sidebar from '@/components/Features/Card/components/Sidebar'
import { useActionsToolkit } from '@/hooks/useActions/toolkit/useActions'

export default function Card() {
	const navigate = useNavigate()
	const { userId, boardId, cardId } = useParams()
	const cardInfo = useTypedSelector(({card}) => card.cardState.cardInfo)
	const car = useTypedSelector(state => state.board)

	const isLoading = useTypedSelector(({card}) => card.cardState.isLoading)
	const { closeCard } = useActions()
	const { getOneCard } = useActionsToolkit()
	useEffect(() => {
		  if (cardId) getOneCard(cardId)
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
							{cardInfo.decisionDate &&
								<Deadline _id={cardInfo._id} decisionDate={cardInfo.decisionDate} />
							}
							<CurrentUsers />
							<Description description={cardInfo.description} _id={cardInfo._id} />
							{cardInfo.checkList.length > 0 &&
								<Checklist
									_id={cardInfo._id}
									countTask={cardInfo.countTask}
									doneTask={cardInfo.doneTask}
									checkList={cardInfo.checkList}
								/>
							}
						</div>
						<Sidebar />
					</div>
				</>
			</div>

		</Modal>
	)
}
