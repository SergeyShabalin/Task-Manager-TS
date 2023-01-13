import React from 'react'
import classes from './Loader.module.css'
// TODO исправить названия
interface LoaderTypes {
	variant?: 'global' | 'local'
	color?: 'lds-white'|'lds-black'
	size?: 'large' | 'small' | 'normal'
}

export default function Loader({
	variant = 'global',
	color = 'lds-white',
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
