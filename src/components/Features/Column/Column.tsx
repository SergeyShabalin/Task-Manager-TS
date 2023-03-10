import React from 'react'

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
	const { addNewCard, changeColumn, dragAndDropCard } = useActions()
	const allCards = useTypedSelector(state => state.board.allCards)

	function addCard(value: string) {
		return addNewCard(_id, value)
	}

	function columnChange(value: string) {
		return changeColumn(_id, value)
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

		const payload = {
			currentColumnId,
			currentCardId,
			targetColumnId,
			targetCardId
		}
		dragAndDropCard(payload)
	}

	function onDragLeaveCard(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		e.dataTransfer.effectAllowed = 'move'
	}

	function onDropCard(e: React.DragEvent<HTMLDivElement>, cardId: string) {
		targetCardId = cardId
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
		<div className={classes.wrapper}>
			<div
				id={_id}
				className={classes.list_wrapper}
				onDragEnter={e => onDragEnterColumn(e, _id)}
				onDragOver={e => onDragOverColumn(e)}
				onDrop={e => onDropColumn(e, 'new', _id)}
			>
				<div className={classes.header}>
					<Editor
						buttonSubmitTitle='????????????????'
						onSubmit={columnChange}
						placeholder='?????????????? ???????????????? ????????????????'
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
						buttonSubmitTitle='????????????????'
						onSubmit={addCard}
						placeholder='?????????????? ???????????????? ????????????????'
					>
						<Button variant='contained' title='???????????????? ????????????????' />
					</Editor>
				</div>
			</div>
		</div>
	)
}
