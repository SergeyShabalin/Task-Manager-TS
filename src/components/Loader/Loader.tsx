import React from 'react'
import './Loader.css'

interface LoaderTypes {
	variant?: string
	color?: string
}

export default function Loader({ variant = 'lds_wrapper', color = 'lds-roller' }: LoaderTypes) {
	return (
		<div className={`${variant}`}>
			<div className={`${color}`}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
};