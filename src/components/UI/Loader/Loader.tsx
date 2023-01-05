import React from 'react'
import classes from './Loader.module.css'
// TODO исправить названия
interface LoaderTypes {
	variant?: 'lds_wrapper' | 'black'
	color?: 'lds-roller'
	size?: 'large' | 'small' | 'normal'
}

export default function Loader({
	variant = 'lds_wrapper',
	color = 'lds-roller',
	size = 'large'
}: LoaderTypes) {
	return (
		<div className={`${classes[variant]}`}>
			<div className={`${classes[color]} ${classes[size]}`}>
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	)
}
