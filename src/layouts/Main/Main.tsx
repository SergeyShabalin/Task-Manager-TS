import React from 'react'

import { Board } from '@Features'

import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Loader } from '@UI'
import classes from './Main.module.css'

import useSocket from '@/hooks/useSocket/useSocket'
import { useSelector } from 'react-redux'

export default function Main() {

	 const background = useTypedSelector(state => state.board.boardState.currentBoard.background)
	// const isLoading = useTypedSelector(state => state.board.isLoadingBoard)

	console.log(background)
	return (
		// <div className={background ? classes[background] : classes.main}>
			<div className={classes.header_main}>
				{/*{isLoading && <Loader size={'large'} />}*/}
				 <Board />
			</div>
		// </div>

	)
}
