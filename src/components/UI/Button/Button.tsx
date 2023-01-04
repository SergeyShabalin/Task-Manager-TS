import React from 'react'

import classes from './Button.module.css'

interface ButtonProps {
	label?: string
	icon?: React.ReactNode
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
	disabled?: boolean
	color?: 'submit' | 'error' | 'changed' | ''
	color_icon?: string
	children?: any
	variant?: 'contained' | 'outlined' | 'text' | 'just_icon'
	fullSize?: boolean
	opacity?: boolean
	variety?: boolean
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Button({
	label,
	icon,
	startIcon,
	endIcon,
	variant = 'text',
	disabled,
	color = '',
	color_icon = '',
	variety = false,
	children,
	onClick,
	fullSize = false,
	opacity = false,
	...props
}: ButtonProps) {
	return (
		<div className={classes.button_container}>
			<button
				disabled={disabled}
				onClick={onClick}
				{...props}
				className={`${classes[variant]}
				${fullSize && classes.fullSize}
				${opacity && classes.opacity}
				${classes[color]}
				${classes[color_icon]}
				${variety && classes.sized}
				${classes.button}`}
			>
				{startIcon && <div className={classes.startIcon}>{startIcon}</div>}
				{icon && <div className={classes.only_icon}>{icon}</div>}
				{label && <span className={classes.label}>{label}</span>}
				{children}
				{endIcon && <div className={classes.endIcon}>{endIcon}</div>}
			</button>
		</div>
	)
}
