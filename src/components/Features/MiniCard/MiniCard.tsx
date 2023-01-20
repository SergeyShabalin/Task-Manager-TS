import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'

import classes from './MiniCard.module.css'
import { Card } from '@/models/Cards'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import { Checkout, Editor } from '@/components/Features'
import { FiEdit3 } from 'react-icons/all'

export default function MiniCard({ title, _id, countTask, doneTask }: Card) {
	const { deleteCard, changeCard } = useActions()
	const location = useLocation()

	function cardDelete() {
		deleteCard(_id)
	}

	function changeCardTitle(title: string) {
		const payload = { _id, title }
		const isSuccess = changeCard(payload)
		return isSuccess
	}

	return (
			<div className={classes.list_card}>
				<Link state={{ background: location }} to={`/board/63ad83c2097128dd4caad35a/card/${_id}`}>
				<div className={classes.title}>{title}</div>
				</Link>
				<Editor
					buttonSubmitTitle='Добавить'
					onSubmit={changeCardTitle}
					placeholder='Введите название карточки'
					defaultValue={title}
				>
				<Button variant='just_icon' icon={<FiEdit3 />}  />
				</Editor>
				
				<div className={classes.footer}>
					<span>
						<Checkout countTask={countTask} doneTask={doneTask}/>
					</span>
					<Button variant='just_icon' icon={<GrClose />} onClick={cardDelete} />
				</div>
			</div>

	)
}
