import React from 'react'
import classes from './Column.module.css'
import { MiniCard } from '@Features'

import { Column as ColumnT } from '@/models/Columns'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { AiOutlinePlus } from 'react-icons/all'
import { useActions } from '@/hooks/useActions/useActions'
import { Editor } from '@Features'

let targetCardId = ''

export default function Column({ title, cards, _id }: ColumnT) {
	const { deleteColumn, addNewCard, changeColumn, dragAndDropCard } = useActions()
	const allCards = useTypedSelector(state => state.board.allCards)

	function columnDelete() {
		deleteColumn(_id)
	}

	function addCard(value: string) {
		return addNewCard(_id, value)
	}

	function columnChange(value: string) {
		return changeColumn(_id, value)
	}

	function onDragStart(e: React.DragEvent<HTMLDivElement>, columnId: string, cardId: string) {
		e.dataTransfer.effectAllowed = 'move'
		e.dataTransfer.setData('cardId', cardId)
		e.dataTransfer.setData('columnId', columnId)
	}

	function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	function onDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	function onDrop(e: React.DragEvent<HTMLDivElement>, status: string, targetColumnId: string) {
		e.preventDefault()
		let currentCardId = e.dataTransfer.getData('cardId')
		let currentColumnId = e.dataTransfer.getData('columnId')

		const payload = {
			currentColumnId,
			currentCardId,
			targetColumnId,
			targetCardId
		}
		dragAndDropCard(payload)
	}

	function onDragEnd(e: React.DragEvent<HTMLDivElement>, cardId: string) {
		e.preventDefault()
		e.dataTransfer.effectAllowed = 'move'
		targetCardId = cardId
		e.dataTransfer.setData('dropCardId', cardId)
	}

	const miniCards = cards?.map(id => {
		const card = allCards[id]
		return (
			<div
				key={id}
				id={id}
				draggable
				onDragStart={e => onDragStart(e, card.column_id, id)}
				onDragLeave={e => onDragEnd(e, id)}
				className={classes.list_card}
			>
				<MiniCard {...card} />
			</div>
		)
	})

	return (
		<div className={classes.wrapper} >
			<div
				id={_id}
				className={classes.list_wrapper}
				onDragEnter={e => onDragEnter(e)}
				onDragOver={e => onDragOver(e)}
				onDrop={e => onDrop(e, 'new', _id)}
			>
				<Editor
					buttonSubmitTitle='изменить'
					onSubmit={columnChange}
					placeholder='Введите название карточки'
					defaultValue={title}
				>
					<div>{title}</div>
				</Editor>
				<Button variant={'just_icon'} icon={<AiOutlinePlus />} onClick={columnDelete} />
				<div className={classes.cards_wrapper}>
					{miniCards}
				</div>
				<div className={classes.card_creator}>
					<Editor
						buttonSubmitTitle='Добавить'
						onSubmit={addCard}
						placeholder='Введите название карточки'
					>
						<Button variant='contained' title='Добавить карточку' />
					</Editor>
				</div>
			</div>
		</div>
	)
}
