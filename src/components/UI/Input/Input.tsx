import React from 'react'
import classes from './Input.module.css'

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	rows?: number
	cols?: number
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	variant?: 'normal' | 'large'
	color?: 'black' | 'white' | 'transparent' | 'outlined'
	name?: string
	autocomplete?: string
}

export default function Input({
	rows = 1,
	iconLeft,
	iconRight,
	variant = 'normal',
	color = 'white',
	name = 'input',
	...props
}: inputProps) {
	if (rows > 1) {
		return (
			<div className={` ${classes[color]}`}>
				<textarea
					rows={3}
					className={`
					 ${classes.text_area} 
					${classes[variant]}
					 ${classes[color]}
					 `}
					{...props}
				/>
			</div>
		)
	}
	return (
		<div>
			<div className={`${classes.input_container} ${classes[color]}`}>
				{iconLeft && iconLeft}
				<input
					name={name}
					className={`${classes.input} ${classes[variant]} ${classes[color]}`}
					{...props}
				/>
				{iconRight && iconRight}
			</div>
		</div>
	)
}
