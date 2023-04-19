import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { Card } from '@/models/Cards'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import { Checkout, DecisionDate } from '@/components/Features'
import { BsThreeDots } from 'react-icons/bs'
import Description from '@/components/Features/MiniCard/Description'
import ContextMenu from '@/components/Features/MiniCard/ContextMenu/ContextMenu'
import classes from './MiniCard.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

export default function MiniCard({
	title,
	_id,
	countTask,
	doneTask,
	decisionDate,
	description
}: Card) {
	const { userId, boardId } = useParams()
	const location = useLocation()
	const [isOpenContext, setIsOpenContext] = useState(false)
	const socket = useTypedSelector(({ user }) => user.socket)

	function cardDelete() {
		const confirm = window.confirm('Удалить карточку?')
		if (confirm) {
			socket?.emit('CARD_DELETE', _id)
			console.log(_id)
			// deleteCard(_id)
		}
	}

	function contextClose() {
		setIsOpenContext(false)
	}

	function contextOpen() {
		setIsOpenContext(true)
	}

	return (
		<>
			<div className={classes.list_card}>
				{isOpenContext && (
					<ContextMenu
						userId={userId}
						boardId={boardId}
						cardId={_id}
						contextClose={contextClose}
						cardDelete={cardDelete}
					/>
				)}
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
					<DecisionDate decisionDate={decisionDate!} />
					<Checkout countTask={countTask} doneTask={doneTask} />
					<Description isOpen={description} />
				</div>
			</div>
		</>
	)
}
