import React, { useState } from 'react'
import classes from './MiniCard.module.css'
import { Link } from 'react-router-dom'

import { Card as CardT } from '@/models/Cards'

export default function Card({header} :CardT) {
	return (
		<>
			<div className={classes.list_card}>
				<Link className={classes.link} state={{ background: location }} to={`/board/${'boardId'}/card/${'cardId'}`}>
					<div className={classes.title}>{header}</div>
				</Link>
				<div className={classes.footer}>decisionDate Checkout</div>
			</div>
		</>
	)
}
