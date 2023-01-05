import React from 'react'

import classes from './Checkbox.module.css'

interface CheckboxTypes extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	variant?: 'text' | 'contained' | 'outlined'
	disabled?: boolean
}

export default function Checkbox({
	label,
	variant = 'text',
	disabled = false,
	...props
}: CheckboxTypes) {
	return (
		<div>
			<div
				className={`
				${classes.checkbox_container} 
				${classes[variant]} 
				${disabled && classes.disabled}
				`}
			>
				<input disabled={disabled} type='checkbox' className={classes.custom_checkbox} {...props} />
				{label && <span className={classes.label}>{label}</span>}
			</div>
		</div>
	)
}
