import React from 'react'
import classes from './Main.module.css'
import Header from '@Features/Header'

export default function Main() {
	return (
		<div className={classes.main}>
			<div className={classes.header_main}>
				<Header />
			</div>
		</div>
	)
}
