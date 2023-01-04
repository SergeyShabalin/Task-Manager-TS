import React, { useEffect } from 'react'
import classes from './Board.module.css'
import Column from '@/components/App/Column'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentBoard } from '@/store/board/asyncActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'

export default function Board() {
	const {getCurrentBoard} = useActions()
	const currentBoard = useTypedSelector(state => state.board.currentBoard.columns)

	useEffect(() => {
		getCurrentBoard('dfasdfsf')
	}, [])
	console.log(currentBoard)
	const columns = currentBoard?.map(column => (<Column key={column._id} {...column} />))

	return (
		<div>
			<div className={classes.wrapper_list}>
				<div className={classes.columns}>
					{columns}
				</div>
				<div className={classes.add_list}>ListCreator</div>
			</div>
		</div>
	)
}
