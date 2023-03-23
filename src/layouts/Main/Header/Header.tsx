import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiTrelloFill } from 'react-icons/ri'

import { Button } from '@UI'
import { User } from '@/models/Users'
import useOpenClose from '@/hooks/UseOpenClose'
import Share from '@/components/Features/Share'
import Messages from '@/layouts/Main/Header/Messages'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import Logout from '@/layouts/Main/Header/Logout'
import Account from '@/layouts/Main/Header/Account'
import { useActions } from '@/hooks/useActions/useActions'

import classes from './Header.module.css'
import UseSocket from '@/hooks/useSocket/useSocket'



export default function Header({ _id, email }: Partial<User>) {
	const navigate = useNavigate()
	const { userId, boardId } = useParams()
	const { getUsersOneBoard, backToGreeting } = useActions()
	const { isOpen, onClose, onOpen } = useOpenClose()
	const messagesCount = useTypedSelector(state => state.user.messages.length)
	const {socketCon} = UseSocket()
	const [socket] = useState(socketCon())

	function backInGreeting() {
		if (_id) navigate(`/user/${userId}/greeting`)
		if (boardId){
			backToGreeting(boardId)
			socket.emit('LEAVE_BOARD', boardId)
		}
	}

	function openShare() {
		if (boardId) getUsersOneBoard(boardId)
		onOpen()
	}

	return (
		<div className={classes.header}>
			<div className={classes.logo} onClick={backInGreeting}>
				<span className={classes.icon}>
					<RiTrelloFill />
				</span>
				<span>TASK MANAGER</span>
			</div>
			{boardId && (
				<div className={classes.share}>
					<Button title='Поделиться' endIcon={<MdKeyboardArrowDown />} onClick={openShare} />
					{isOpen && <Share onClose={onClose} />}
				</div>
			)}

			<div className={classes.control}>
				<Account />
				<Messages messagesCount={messagesCount} />
				<Logout />
			</div>
		</div>
	)
}
