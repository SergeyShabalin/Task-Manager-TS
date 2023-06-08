import React, { useState } from 'react'
import { GiConfirmed } from 'react-icons/all'


import classes from './UserList.module.css'
import { User } from '@/models/Users'



interface UserListProps {
	user: Partial<User>
	addUser: (userId: string) => void
	added: boolean
}

export default function UserList({ user, addUser, added }: UserListProps) {

	const [view, setView] = useState(added)

	function changeView(userId: string | undefined) {
		if (userId) {
			addUser(userId)
			setView(!view)
		}
	}

	return (
		<div className={classes.user} key={user._id} onClick={() => changeView(user._id)}>
			<div className={classes.avatar_wrapper}>
				{user.avatar
					? <img className={classes.avatar} src={user.avatar} />
					: <div className={classes.icon}>
						{user.secondName?.[0].toUpperCase()}{user.firstName?.[0].toUpperCase()}
					</div>
				}
			</div>

			<div className={classes.user_info}>
				<div className={classes.email}>{user.email}</div>
				<div className={classes.name}>{user.secondName} {user.firstName}</div>
				{view && <div><GiConfirmed className={classes.done} /></div>}
			</div>
		</div>
	)
}
