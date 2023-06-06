import React, { useEffect, useState } from 'react'
import classes from '@/components/Features/Card/components/Sidebar/AddUsers/AddUsers.module.css'
import { User } from '@/models/Users'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { BsPatchCheck } from 'react-icons/all'

interface UserListProps {
	user: Partial<User>
	addUser: (userId: string) => void
	added: boolean
}

export default function UserList({ user, addUser, added }: UserListProps) {

	const [view, setView] = useState(added)

	const card = useTypedSelector(state => state.board.cardInfo.memberIds)


function xxxx(userId) {
	addUser(userId)
	if(view) {
		setView(false)
	} else{
		setView(true)
	}
}

	return (
		<div className={classes.user} key={user._id} onClick={() => xxxx(user._id)}>
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
				{view && <div><BsPatchCheck className={classes.done} /></div>}
			</div>
		</div>
	)
}
