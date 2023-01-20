import React from 'react'
import classes from './Description.module.css'
import { BsReverseLayoutTextWindowReverse } from 'react-icons/all'

export default function Description( isOpen : boolean){
	return (
		<div className={classes.wrapper}>
			<BsReverseLayoutTextWindowReverse/>
		</div>
	)
}
