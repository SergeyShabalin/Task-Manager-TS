import React, { useEffect } from 'react'
import classes from './CurrentUsers.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { useActions } from '@/hooks/useActions/useActions'

interface CurrentUserProps {
	boardId: string
}

export default function CurrentUsers({ boardId }: CurrentUserProps) {
	const users = useTypedSelector(state => state.board.allUsers)
	const userId = useTypedSelector(state => state.user._id)
	const navigate = useNavigate()
	const { getUsersOneBoard } = useActions()

	useEffect(() => {
		if (boardId) getUsersOneBoard(boardId)
	}, [])

	function openProfile(user_id: string) {
		if (user_id) navigate(`/user/${user_id}/profile`)
		if (userId) localStorage.setItem('user_authenticated', userId)
	}

	return (
		<div>
			<div className={classes.users}>
				<div className={classes.user_list}>
					{users?.map(user => (
						<div className={classes.user} key={user._id} onClick={e => openProfile(user._id)}>
							<div className={classes.avatar_wrapper}>
								{user.avatar ? (
									<img className={classes.avatar} src={user.avatar} />
								) : (
									<div className={classes.icon}>{user.email[0].toUpperCase()}</div>
								)}
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
