import React from 'react'

import classes from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title?: string
	icon?: React.ReactNode
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
	disabled?: boolean
	color?: 'primary' | 'secondary' | 'error'
	variant?: 'contained' | 'outlined' | 'text' | 'just_icon'
	fullSize?: boolean
}

export default function Button({
	title,
	icon,
	startIcon,
	endIcon,
	variant = 'text',
	color = 'secondary',
	children,
	fullSize = false,
	...props
}: ButtonProps) {
	function classNames() {
		let arrayClasses = [classes.button, classes[variant], classes[color]]
		if (fullSize) arrayClasses.push(classes.fullSize)
		return arrayClasses.join(' ')
	}
	return (
		<div className={classes.button_container}>
			<button className={classNames()} {...props}>
				{startIcon && <div className={classes.startIcon}>{startIcon}</div>}
				{icon && <div className={classes.only_icon}>{icon}</div>}
				{title && <span className={classes.label}>{title}</span>}
				{children}
				{endIcon && <div className={classes.endIcon}>{endIcon}</div>}
			</button>
		</div>
	)
}
