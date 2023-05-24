import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import classes from './AddUsers.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

import { useActions } from '@/hooks/useActions/useActions'
import { Button } from '@UI'
import { IoMdAdd } from 'react-icons/io'

interface AddUsersProps {
	closeUsers: () => void
}

export default function AddUsers({ closeUsers }: AddUsersProps) {

	const addUsersRef = useRef(null)
	useOnClickOutside(addUsersRef, () => closeUsers())

	const users = useTypedSelector(state => state.board.allUsers)
	const	socket = useTypedSelector(({ user }) => user.socket)
	const { boardId, cardId } = useParams()
	const { getUsersOneBoard } = useActions()

	useEffect(() => {
		if (boardId) getUsersOneBoard(boardId)
	}, [])

	function addUser(userId: string) {

		const payload = {
			userId, cardId
		}
		if (socket) socket.emit('ADD_MEMBER_ONE_CARD', payload)
	}

	return (
		<div className={classes.wrapper} ref={addUsersRef}>
			<h1> Добавление участников</h1>
			<hr />

			<div>Участники доски</div>
			<div>
				{users?.map(user => (
					<div className={classes.user} key={user._id} onClick={()=>addUser(user._id)}>

						<div className={classes.avatar_wrapper}>
							{user.avatar
								? <img className={classes.avatar} src={user.avatar} />
								:
								<div className={classes.icon}>{user.secondName[0].toUpperCase() + user.firstName[0].toUpperCase()}</div>
							}
						</div>

						<div className={classes.user_info}>
							<div className={classes.email}>{user.email}</div>
							<div className={classes.name}>{user.secondName} {user.firstName}</div>

						</div>

					</div>
				))}
			</div>
		</div>
	)
}
