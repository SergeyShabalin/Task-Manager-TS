import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import classes from './AddUsers.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

import { useActions } from '@/hooks/useActions/useActions'
import Search from '@/components/Features/Card/components/Sidebar/AddUsers/Search'

import { TbFaceIdError } from 'react-icons/all'
import UserList from '@/components/Features/Card/components/Sidebar/AddUsers/UserList'

interface AddUsersProps {
	closeUsers: () => void
}

export default function AddUsers({ closeUsers }: AddUsersProps) {
	const addUsersRef = useRef(null)
	useOnClickOutside(addUsersRef, () => closeUsers())

	const users = useTypedSelector(state => state.board.allUsers)
	const socket = useTypedSelector(({ user }) => user.socket)
	const { boardId, cardId } = useParams()
	const { getUsersOneBoard, changeViewUserOneCard } = useActions()
	const [currentUsers, setCurrentUsers] = useState(users)
	const card = useTypedSelector(state => state.board.cardInfo.memberIds)

	console.log(card)
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
		changeViewUserOneCard(userId)
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
					{currentUsers?.map(user => {
						let added
						added = card.includes(user._id);
						return(
							<div key={user._id}>
								<UserList added={added} addUser={addUser} user={user} />
							</div>
						)
						}
					)}
				</div>
			) : (
				<div className={classes.empty_users}>
					<TbFaceIdError className={classes.icon_empty} />
					<div className={classes.empty_title}>Пользователей не найдено</div>
				</div>
			)}
		</div>
	)
}
