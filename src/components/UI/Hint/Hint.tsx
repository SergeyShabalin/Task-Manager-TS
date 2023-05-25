import React from 'react'
import classes from './Hint.module.css'

interface HintProps {
	visible: boolean
	label: string | undefined
}

export default function Hint({ visible, label }: HintProps) {
	return (
		<div>
			<span className={visible ? classes.hint : classes.hide}>{label}</span>
		</div>
	)
}
