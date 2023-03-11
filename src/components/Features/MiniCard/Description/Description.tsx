import React from 'react'
import classes from './Description.module.css'
import { BsReverseLayoutTextWindowReverse } from 'react-icons/all'

interface DescriptionProps {
	isOpen: boolean | string
}

export default function Description({ isOpen }: DescriptionProps) {
	return <div className={classes.wrapper}>{isOpen && <BsReverseLayoutTextWindowReverse />}</div>
}
