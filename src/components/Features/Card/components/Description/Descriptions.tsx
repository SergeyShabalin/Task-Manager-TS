import React from 'react'
import { AiOutlineMenuUnfold } from 'react-icons/ai'

import classes from './Description.module.css'
import { Editor } from '@Features'
import { Card } from '@/models/Cards'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

type DescriptionProps = Pick<Card, 'description' | '_id'>

export default function Description({ description, _id }: DescriptionProps) {
	const socket = useTypedSelector(state => state.user.socket)

	function changeDescription(description: string) {
		const payload = { _id, description }
		if (socket?.emit('CARD_CHANGE', payload)) {
			return true
		}
	}

	return (
		<>
			<div className={classes.description_wrapper}>
				<AiOutlineMenuUnfold className={classes.icons} />
				<h4 className={classes.description_title}>Описание</h4>
			</div>
			<Editor
				buttonSubmitTitle='Сохранить'
				onSubmit={changeDescription}
				defaultValue={description}
				rows={1}
				color='outlined'
			>
				<div className={classes.description_card}>
					{description ? <span>{description}</span> : <span>Нет описания</span>}
				</div>
			</Editor>
		</>
	)
}
