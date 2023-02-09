import React from 'react'
import { AiOutlineMenuUnfold } from 'react-icons/ai'

import classes from './Description.module.css'
import { Editor } from '@Features'
import { Card } from '@/models/Cards'
import { useActions } from '@/hooks/useActions/useActions'

type DescriptionProps = Pick<Card, 'description' | '_id'>

export default function Description({ description, _id }: DescriptionProps) {
	const { changeCard } = useActions()

	function changeDescription(description: string) {
		const payload = { _id, description }
		const isSuccess = changeCard(payload)
		return isSuccess
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
