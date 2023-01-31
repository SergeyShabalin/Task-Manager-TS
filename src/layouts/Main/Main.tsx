import React, { useEffect } from 'react'

import { Board } from '@Features'
import Header from './Header'

import classes from './Main.module.css'
import { useParams } from 'react-router-dom'
import { useActions } from '@/hooks/useActions/useActions'

export default function Main() {
	const { userId } = useParams()
	const { checkLogin } = useActions()

	useEffect(() => {
		if (userId) checkLogin(userId)
	}, [userId])

	return (
		<div className={classes.main}>
			<div className={classes.header_main}>
				<Header />
				<Board />
			</div>
		</div>
	)
}
