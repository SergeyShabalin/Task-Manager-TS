import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'
import { Card } from '@/models/Cards'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import { Checkout, DecisionDate, Editor } from '@/components/Features'
import { FiEdit3 } from 'react-icons/all'
import Description from '@/components/Features/MiniCard/Description'

import classes from './MiniCard.module.css'

export default function MiniCard({
	title,
	_id,
	countTask,
	doneTask,
	decisionDate,
	description, column_id
}: Card) {
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
		<div
			// draggable
			// onDragStart={(e) => handleDragStart(e, column_id, _id)}
			// onDrop={(e) => handleDrop(e, column_id)}
			className={classes.list_card}
			// onDragLeave={handleDragLeave}
			// onDragEnd={handleDragEnd}
			// // onDrop={handleDrop}
			// onDragOver={handleDragOver}
		>
			<Link
				className={classes.link}
				state={{ background: location }}
				to={`/board/63ad83c2097128dd4caad35a/card/${_id}`}
			>
				<div className={classes.title}>{title}</div>
			</Link>

			<Editor
				buttonSubmitTitle='Добавить'
				onSubmit={changeCardTitle}
				placeholder='Введите название карточки'
				defaultValue={title}
			>
				<Button variant='just_icon' icon={<FiEdit3 />} />
			</Editor>

			<div className={classes.footer}>
				<DecisionDate decisionDate={decisionDate} />
				<Checkout countTask={countTask} doneTask={doneTask} />
				<Description isOpen={description} />

				<Button variant='just_icon' icon={<GrClose />} onClick={cardDelete} />
			</div>
		</div>
	)
}
