import React from 'react'
import classes from './Input.module.css'

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	rows?: number
	cols?: number
	label?: string
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	variant?: 'transparent' | 'input' | 'large'
}

export default function Input({
	rows = 1,
	label,
	iconLeft,
	iconRight,
	variant = 'input',
	...props
}: inputProps) {
	if (rows > 1) {
		return (
			<div className={classes.input_container}>
				{label && <span className={classes.label}>{label}</span>}
				<textarea
					rows={rows}
					className={classes[variant]}
					{...props}
				/>
			</div>
		)
	}
	return (
		<div>
			{label && <span className={classes.label}>{label}</span>}
			<div className={classes.input_container}>
				{iconLeft && iconLeft}
				<input
					type='text'
					className={classes[variant]}
					{...props}
				/>
				{iconRight && iconRight}
			</div>
		</div>
	)
}
