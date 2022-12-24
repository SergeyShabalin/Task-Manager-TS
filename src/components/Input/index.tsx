import React from 'react'
import classes from './Input.module.css'

interface inputProps {
	value?: string
	rows?: number
	cols?: number
	placeholder?: string
	onChange?: ()=> void
	label?: string
	disabled?: boolean
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	variant?: string
	container?: string
	autoFocus? : boolean
}

export default function Input({
	value,
	rows = 1,
	cols,
	placeholder,
	onChange,
	label,
	disabled,
	iconLeft,
	iconRight,
	variant = 'input',
	container = 'input_container',
	...props
} : inputProps) {
	return (
		<div>
			{rows > 1 ? (
				<div className={`${classes[container]}`}>
					{label && <span className={classes.label}>{label}</span>}
					<textarea
						placeholder={placeholder}
						rows={rows}
						cols={cols}
						className={`${classes[variant]}`}
						defaultValue={value}
						onChange={onChange}
						{...props}
					/>
				</div>
			) : (
				<div>
					{label && <span className={classes.label}>{label}</span>}

					<div className={`${classes[container]}`}>
						{iconLeft && iconLeft}
						<input
							type='text'
							disabled={disabled}
							placeholder={placeholder}
							onChange={onChange}
							className={`${classes[variant]}`}
							defaultValue={value}
							{...props}
						/>
						{iconRight && iconRight}
					</div>
				</div>
			)}
		</div>
	)
}
