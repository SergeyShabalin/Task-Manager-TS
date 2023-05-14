import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import Configuration from '@/layouts/Main/Header/Configuration'

export default function Header({ _id }: Partial<User>) {
	const navigate = useNavigate()
	const { userId, boardId } = useParams()
	const url = useLocation()
	const {  backToGreeting } = useActions()
	const { isOpen, onClose, onOpen } = useOpenClose()
	const messagesCount = useTypedSelector(state => state.user.messages.length)
	const socket = useTypedSelector(({ user }) => user.socket)
	let configuration = url.pathname.includes('configuration')


	function backInGreeting() {
		if (_id) navigate(`/user/${userId}/greeting`)
		if (boardId) {
			backToGreeting(boardId)
			if (socket) socket.emit('LEAVE_BOARD', boardId)
		}
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
					<Button title='Поделиться' endIcon={<MdKeyboardArrowDown />} onClick={onOpen} />
					{isOpen && <Share onClose={onClose} />}
				</div>
			)}

			{configuration && <Configuration />}

			<div className={classes.control}>
				<Account />
				<Messages messagesCount={messagesCount} />
				<Logout boardId={boardId} userId={_id} />
			</div>
		</div>
	)
}
