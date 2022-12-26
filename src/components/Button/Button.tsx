import React from 'react'

import classes from './Button.module.css'

interface buttonProps {
	label?: string
	icon?: React.ReactNode
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
	disabled?: boolean
	color?: string
	color_icon?:string
	children?: any
	variant?: string
	fullSize?: boolean
	opacity?: boolean
	variety?: boolean
	onClick?: () => void
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
}: buttonProps) {
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
