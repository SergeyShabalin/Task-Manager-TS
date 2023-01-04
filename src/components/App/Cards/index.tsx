import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// import { dragDropCard, dragDropCardOneColumn } from "../../../../store/cards/asyncActions";
import Checkout from '../Checkout'
// import ContentEdit from "../ContentEdit";
import DecisionDate from '../DecisionDate'
import './Card.css'
// import "../Columns/ColumnWrapper.css";

export default function Card({ columnId, columnHeader, boardId, targetCard, ...props }) {
	const [shadowIn, setIsShadowIn] = useState(false)
	const dispatch = useDispatch()
	const [now] = useState(new Date().getTime() + 1000000000)
	function handleDragOver() {
		setIsShadowIn(true)
	}

	function handleDragEnd() {
		setIsShadowIn(false)
	}

	function handleDragLeave(e) {
		if (e.target.className !== 'cardShadow') setIsShadowIn(false)
	}

	function handleDrop(e) {
		setIsShadowIn(false)
		const card = JSON.parse(e.dataTransfer.getData('card'))
		const currentColumnId = e.dataTransfer.getData('currentColumnId')
		const data = {
			targetColumnId: columnId,
			currentCard: card,
			currentColumnId: currentColumnId,
			currentOrder: card.order,
			targetCardId: targetCard._id,
			targetOrder: targetCard.order
		}
		if (columnId === currentColumnId) {
			console.log('dispatch(dragDropCardOneColumn(data));')
		} else console.log('dispatch(dragDropCard(data));')
	}

	return (
		<>
			<div
				className='list_card'
				{...props}
				onDragLeave={handleDragLeave}
				onDragEnd={handleDragEnd}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
			>
				{/*<ContentEdit*/}
				{/*	cardId={targetCard._id}*/}
				{/*	header={targetCard.header}*/}
				{/*	order={targetCard.order}*/}
				{/*	columnId={columnId}*/}
				{/*	boardId={boardId}*/}
				{/*	columnHeader={columnHeader}*/}
				{/*/>*/}

				<div className='footer'>
					{/*{targetCard.decisionDate &&*/}
					<DecisionDate decisionDate={now} />
					{/*}*/}
					<Checkout countTask={5} doneTask={5} />
				</div>
			</div>
			{shadowIn && <div className='cardShadow'></div>}
		</>
	)
}
