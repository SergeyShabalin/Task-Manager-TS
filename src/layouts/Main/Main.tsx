import React, { useEffect } from 'react'

import Board from '@/components/App/Board'
import Header from './Header'

import classes from './Main.module.css'

export default function Main() {
	return (
		<div className={classes.main}>
			<div className={classes.header_main}>
				<Header />
				<div className={classes.work_space}>
					<Board />
				</div>
			</div>
		</div>
	)
}
