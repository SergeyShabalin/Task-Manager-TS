import React from 'react'

import { Board } from '@Features'
import Header from './Header'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import classes from './Main.module.css'

export default function Main() {
	const userId = useTypedSelector(state => state.user._id)
	const email = useTypedSelector(state => state.user.email)
	const background = useTypedSelector(state => state.board.currentBoard.background)

	return (
		<div className={ background ?  classes[background] : classes.main}>
			<div className={classes.header_main}>
				<Header _id={userId} email={email}/>
				<Board />
			</div>
		</div>
	)
}
