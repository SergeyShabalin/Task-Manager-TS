import React, { useEffect } from 'react'

import { Board } from '@Features'
import Header from './Header'

import classes from './Main.module.css'
import { useParams } from 'react-router-dom'
import { useActions } from '@/hooks/useActions/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

export default function Main() {
	const { userId } = useParams()
	const { checkLogin } = useActions()

	const user = useTypedSelector(state => state.user)

	useEffect(() => {
		if (userId) checkLogin(userId)
	}, [userId])
	const lastBoard = user.boardIds.length -1
	const currentBoardId = user.boardIds[lastBoard]

	return (
		<div className={classes.main}>
			<div className={classes.header_main}>
				<Header userId = {userId} />
				<Board userId = {userId} currentBoardId={currentBoardId} />
			</div>
		</div>
	)
}
