import React, { useState } from 'react'
import classes from './MiniCard.module.css'
import { Link } from 'react-router-dom'

import { Card as CardT } from '@/models/Cards'
import { Button } from '@/components/UI'
import { GrClose } from 'react-icons/gr'
import { useActions } from '@/hooks/useActions/useActions'

export default function Card({ header, _id }: CardT) {

	const { deleteCard } = useActions()

	function cardDelete(){
		deleteCard(_id)
	}

	return (
		<>
			<div className={classes.list_card}>
				<Link
					className={classes.link}
					state={{ background: location }}
					to={`/board/${'boardId'}/card/${'cardId'}`}
				>
					<div className={classes.title}>{header}</div>
				</Link>
				<div className={classes.footer}>
					decisionDate Checkout
					<Button variant='just_icon' icon={<GrClose />} onClick={cardDelete} />
				</div>
			</div>
		</>
	)
}
