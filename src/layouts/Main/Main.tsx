import React from 'react'

import { Board } from '@Features'
import Header from './Header'

import classes from './Main.module.css'


export default function Main() {

	return (
		<div className={classes.main}>
			<div className={classes.header_main}>
				<Header />
					<Board />
				</div>
		</div>
	)
}
