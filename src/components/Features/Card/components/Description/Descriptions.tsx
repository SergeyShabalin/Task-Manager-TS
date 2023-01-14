import React from 'react'
import classes from './Description.module.css'
import { Editor } from '@Features'
import { Card } from '@/models/Cards'

type DescriptionProps = Pick<Card, 'description'>

export default function Description({ description }: DescriptionProps){

	function changeDescription(value: string){

	}

	return (
		<Editor buttonSubmitTitle='Сохранить' onSubmit={changeDescription}>
			<div className={classes.description_card}>{description}</div>
		</Editor>
	)
}

