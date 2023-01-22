import React, { useState } from 'react'
import classes from './Column.module.css'
import { MiniCard } from '@Features'

import { Column as ColumnT } from '@/models/Columns'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { AiOutlinePlus } from 'react-icons/all'
import { useActions } from '@/hooks/useActions/useActions'
import { Editor } from '@Features'

const dnd2 = {
	dragCardId: '',
	dropCardId: '',
	dragColumnId: '',
	dropCardId: ''
}
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

	function handleDrop(e, dropColumnId: string) {
		e.preventDefault()
		const payload = {
			currentColumnId: dnd2.dragColumnId,
			currentCardId: dnd2.dragCardId,
			dropColumnId: dnd2.dropColumnId
		}

	}

	function onDragStart(evt: React.DragEvent<HTMLDivElement>, colId, cardId) {
		evt.dataTransfer.effectAllowed = 'move'
		evt.dataTransfer.setData('cardId', cardId)
		evt.dataTransfer.setData('columnId', colId)
	}

	function onDragEnter(evt) {
		evt.preventDefault()
		// evt.dataTransfer.dropEffect = 'move'
	}

	function onDragOver(evt) {
		evt.preventDefault()
		evt.dataTransfer.dropEffect = 'move'
	}

	function onDrop(evt, status, colId) {
		evt.preventDefault()
		let dragCardId = evt.dataTransfer.getData('cardId')
		let dragColId = evt.dataTransfer.getData('columnId')
		let dropCardId = evt.dataTransfer.getData('dropCardId')
		const payload = {
			currentColumnId: dragColId,
			currentCardId: dragCardId,
			dropColumnId: colId,
			dropCardId: dnd2.dropCardId
		}
		dragAndDropCard(payload)
	}

	function onDragEnd(evt, cardId) {
		evt.preventDefault()
		evt.dataTransfer.effectAllowed = 'move'
		dnd2.dropCardId = cardId
		evt.dataTransfer.setData('dropCardId', cardId)
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
		<div className={classes.wrapper}>
			<div
				className={classes.list_wrapper}
				// onDragEnter={e => onDragEnter(e)}
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
