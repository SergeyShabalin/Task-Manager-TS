import React from 'react'
import './Loader.css'

interface LoaderTypes {
	variant?: string
	color?: string
	size?: string
}

export default function Loader({ variant = 'lds_wrapper', color = 'lds-roller' , size = 'large'}: LoaderTypes) {

	return (
		<div className={`${variant}`}	>
			<div className={`${color} ${size}`} >
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