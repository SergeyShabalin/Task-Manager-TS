import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'
import { Card } from '@/models/Cards'
import { Button, Modal } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import { Checkout, DecisionDate, Editor } from '@/components/Features'
import { BsThreeDots, FiEdit3 } from 'react-icons/all'
import Description from '@/components/Features/MiniCard/Description'

import classes from './MiniCard.module.css'
import ContextMenu from '@/components/Features/MiniCard/ContextMenu/ContextMenu'

export default function MiniCard({
																	 title,
																	 _id,
																	 countTask,
																	 doneTask,
																	 decisionDate,
																	 description
																 }: Card) {
	const { deleteCard, changeCard } = useActions()
	const {userId, boardId } = useParams()
	const location = useLocation()
	const [isOpenContext, setIsOpenContext] = useState(false)

	function cardDelete() {
		deleteCard(_id)
	}

	function changeCardTitle(title: string) {
		const payload = { _id, title }
		const isSuccess = changeCard(payload)
		return isSuccess
	}

	function contextClose() {
		setIsOpenContext(false)
	}

	function contextOpen() {
		setIsOpenContext(true)
	}

	return (
		<div className={classes.list_card}>
			{isOpenContext &&
				<ContextMenu
					contextClose={contextClose}
					changeCardTitle={changeCardTitle}
					cardDelete = {cardDelete}
				/>}
			<div className={classes.header}>

				<Link
					className={classes.link}
					state={{ background: location }}
					to={`/user/${userId}/board/${boardId}/card/${_id}`}
				>
					<div className={classes.title}>{title}</div>
				</Link>
				<div className={classes.edit}>
						<Button variant='just_icon' icon={<BsThreeDots />} onClick={contextOpen} />
				</div>
			</div>

			<div className={classes.footer}>
				<DecisionDate decisionDate={decisionDate} />
				<Checkout countTask={countTask} doneTask={doneTask} />
				<Description isOpen={description} />

				{/*<Button variant='just_icon' icon={<GrClose />} onClick={cardDelete} />*/}
			</div>
		</div>


	)
}
