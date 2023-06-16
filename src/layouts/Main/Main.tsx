import React from 'react'

import { Board } from '@Features'

import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Loader } from '@UI'
import classes from './Main.module.css'

import useSocket from '@/hooks/useSocket/useSocket'
import { useSelector } from 'react-redux'

export default function Main() {

	// const background = useTypedSelector(state => state.board.currentBoard.background)
	// const isLoading = useTypedSelector(state => state.board.isLoadingBoard)
	// const socket  = useSocket()
	const user = useSelector(state => state.user.userState)
	console.log('user', user)
	return (
		// <div className={background ? classes[background] : classes.main}>
		// 	<div className={classes.header_main}>
		// 		{isLoading && <Loader size={'large'} />}
		// 		{socket && <Board />}
		// 	</div>
		// </div>
		  <div>hello
			<h1>{user.email}</h1>
			<h1>{user.firstName}</h1>
			<h1>{user.lastName}</h1>
		<div style={{
			width: '300px',
			height: '300px',
			position :'relative'
		}}><img style={{
			position :'absolute',
			width: '100%',
			height: '100%'
		}} src={user.avatar}/></div>
		</div>
	)
}
