import React, { useState } from 'react'
import classes from './Column.module.css'
import MiniCard from '@/components/App/MiniCard'
import { useSelector } from 'react-redux'

import { Column as ColumnT } from '@/models/Columns'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'


export default function Column({header, cards}: ColumnT) {

	const allCards = useTypedSelector(state => state.board.allCards)

	const miniCards = cards?.map(id=>{
		const card = allCards && allCards[id]
		  return(<MiniCard key={id} {...card}/>)
	})



	return (
		<div className={classes.wrapper}>
			<div className={classes.list_wrapper}>
				{header}
				<div className={classes.cards_wrapper}>
					{miniCards}
				</div>
				<div className={classes.card_creator}>cardCreator</div>
			</div>
		</div>
	)
}
