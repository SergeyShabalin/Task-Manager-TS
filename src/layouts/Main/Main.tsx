import React from 'react'

import { Board } from '@Features'
import Header from './Header'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import classes from './Main.module.css'

export default function Main() {
	const userId = useTypedSelector(state => state.user._id)

	return (
		<div className={classes.main}>
			<div className={classes.header_main}>
				<Header _id={userId} />
				<Board />
			</div>
		</div>
	)
}
