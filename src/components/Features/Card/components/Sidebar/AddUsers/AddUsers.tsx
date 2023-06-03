import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import classes from './AddUsers.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

import { useActions } from '@/hooks/useActions/useActions'
import Search from '@/components/Features/Card/components/Sidebar/AddUsers/Search'
import { Notification } from '@UI'
import { TbFaceIdError } from 'react-icons/all'

interface AddUsersProps {
	closeUsers: () => void
}

export default function AddUsers({ closeUsers }: AddUsersProps) {
	const addUsersRef = useRef(null)
	useOnClickOutside(addUsersRef, () => closeUsers())

	const users = useTypedSelector(state => state.board.allUsers)
	const socket = useTypedSelector(({ user }) => user.socket)
	const { boardId, cardId } = useParams()
	const { getUsersOneBoard } = useActions()
	const [currentUsers, setCurrentUsers] = useState(users)


	useEffect(() => {
		if (boardId) getUsersOneBoard(boardId)
	}, [])

	useEffect(() => {
		setCurrentUsers(users)
	}, [users])

	function addUser(userId: string) {
		const payload = {
			userId,
			cardId
		}
		if (socket) socket.emit('ADD_MEMBER_ONE_CARD', payload)
	}




	return (
		<div className={classes.wrapper} ref={addUsersRef}>
			<h1> Добавление участников</h1>
			<hr />
			<span>Поиск участника</span>
			<Search boardId={boardId} />

			<div>Участники доски</div>
			{currentUsers.length > 0 ? (
				<div>
					{currentUsers?.map(user => (
						<div className={classes.user} key={user._id} onClick={() => addUser(user._id)}>
							<div className={classes.avatar_wrapper}>
								{user.avatar ? (
									<img className={classes.avatar} src={user.avatar} />
								) : (
									<div className={classes.icon}>
										{user.secondName[0].toUpperCase() + user.firstName[0].toUpperCase()}
									</div>
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
			) : (
				<div className={classes.empty_users}>
					<TbFaceIdError className = {classes.icon_empty}/>
					<div className={classes.empty_title}>Пользователей не найдено</div>
				</div>
			)}
		</div>
	)
}
