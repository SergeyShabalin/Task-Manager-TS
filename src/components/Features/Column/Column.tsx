import React, { useEffect } from 'react'

import { MiniCard } from '@Features'
import { Column as ColumnT } from '@/models/Columns'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import { Editor } from '@Features'
import ContextMenu from '@/components/Features/Column/ContextMenu'
import classes from './Column.module.css'


let targetCardId = ''

export default function Column({ title, cards, _id }: ColumnT) {
	  const allCards = useTypedSelector(({ board }) => board.boardState.allCards)
	// const socket = useTypedSelector(({ user }) => user.socket)

	console.log(allCards)
	function addCard(value: string) {
		if (socket?.emit('CARD_ADD', { title: value, column_id: _id })) {
			return true
		}
	}

	function columnChange(value: string) {
		if (socket?.emit('COLUMN_CHANGE', { title: value, column_id: _id }))
			return true
	}

	function onDragStartCard(e: React.DragEvent<HTMLDivElement>, columnId: string, cardId: string) {
		e.dataTransfer.effectAllowed = 'move'
		e.dataTransfer.setData('cardId', cardId)
		e.dataTransfer.setData('columnId', columnId)
		targetCardId = ''
	}

	function onDragEnterColumn(e: React.DragEvent<HTMLDivElement>, columnId: string) {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	function onDragOverColumn(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'move'
	}

	function onDropColumn(
		e: React.DragEvent<HTMLDivElement>,
		status: string,
		targetColumnId: string
	) {
		e.preventDefault()
		let currentCardId = e.dataTransfer.getData('cardId')
		let currentColumnId = e.dataTransfer.getData('columnId')

		const dataForDropCard = {
			currentColumnId,
			currentCardId,
			targetColumnId,
			targetCardId
		}

		if (currentCardId && currentCardId && targetColumnId) {
			socket?.emit('CARD_DROP', dataForDropCard)
		}
	}

	function onDragLeaveCard(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		e.dataTransfer.effectAllowed = 'move'
	}

	function onDropCard(e: React.DragEvent<HTMLDivElement>, cardId: string) {
		targetCardId = cardId
	}

	function onDragStartColumn(e: React.DragEvent<HTMLDivElement>, columnId: string) {
		e.dataTransfer.setData('currentColumnId', columnId)
	}

	function onDragDropColumn(e: React.DragEvent<HTMLDivElement>, columnId: string) {
		let currentColumnId = e.dataTransfer.getData('currentColumnId')
		let currentCardId = e.dataTransfer.getData('cardId')
		let targetColumnId = columnId
		const dataForDropColumn = {
			currentColumnId,
			targetColumnId
		}
		if (!currentCardId) {
			socket?.emit('COLUMN_DROP', dataForDropColumn)
		}
	}


	const miniCards = cards?.map(id => {
		const card = allCards[id]
		return (
			<div
				key={id}
				id={id}
				draggable
				onDragStart={e => onDragStartCard(e, card.column_id, id)}
				onDragLeave={e => onDragLeaveCard(e)}
				onDrop={e => onDropCard(e, id)}
			>
				<MiniCard {...card} />
			</div>
		)
	})

	return (
		<div
			className={classes.wrapper}
			draggable
			onDragStart={e => onDragStartColumn(e, _id)}
			onDrop={e => onDragDropColumn(e, _id)}
		>
			<div
				id={_id}
				className={classes.list_wrapper}
				onDragEnter={e => onDragEnterColumn(e, _id)}
				onDragOver={e => onDragOverColumn(e)}
				onDrop={e => onDropColumn(e, 'new', _id)}
			>
				<div className={classes.header}>
					<Editor
						buttonSubmitTitle='изменить'
						onSubmit={columnChange}
						placeholder='Введите название карточки'
						defaultValue={title}
						rows={1}
						color='transparent'
					>
						<div className={classes.column_title}>{title}</div>
					</Editor>
					<div className={classes.context_menu}>
						<ContextMenu columnId={_id} />
					</div>
				</div>

				<div className={classes.cards_wrapper}>{miniCards}</div>
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
