import React, { useState } from 'react'
import classes from './Column.module.css'
import MiniCard from '@/components/Features/MiniCard'
import { useSelector } from 'react-redux'

import { Column as ColumnT } from '@/models/Columns'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@/components/UI'
import { AiOutlinePlus } from 'react-icons/all'
import { useActions  } from '@/hooks/useActions/useActions'
import Editor from '@/components/Features/Editor'


export default function Column({ header, cards, _id }: ColumnT) {
	const { deleteColumn, addNewCard } = useActions()

	const allCards = useTypedSelector(state => state.board.allCards)

	const miniCards = cards?.map(id => {
		const card =  allCards[id]
		return <MiniCard key={id} {...card} />
	})

	function columnDelete() {
		deleteColumn(_id)
	}

	function addCard(value: string) {
		addNewCard(_id,value)
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.list_wrapper}>
				{header}
				<Button variant={'just_icon'} icon={<AiOutlinePlus />} onClick={columnDelete} />
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
