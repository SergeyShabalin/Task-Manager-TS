import React, { useEffect } from 'react'
import classes from './CurrentUsers.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useParams } from 'react-router-dom'
import { useActions } from '@/hooks/useActions/useActions'

export default function CurrentUsers() {
	const users = useTypedSelector(state => state.board.allUsers)
	const { boardId } = useParams()
	const { getUsersOneBoard } = useActions()

	useEffect(()=>{
		if (boardId)	getUsersOneBoard(boardId)
	}, [])

	return (
		<div>

			<div className={classes.users}>
				<div className={classes.user_list}>
					{users?.map(user => (
						<div className={classes.user} key={user._id}>
							<div className={classes.avatar_wrapper}>
								{user.avatar
									?	<img className={classes.avatar} src={user.avatar} />
									: <div className={classes.icon}>{user.email[0].toUpperCase()}</div>
								}
							</div>

							<div className={classes.user_info}>
								<div className={classes.email}>{user.email}</div>
								<div className={classes.name}>
									{user.secondName} {user.firstName}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
