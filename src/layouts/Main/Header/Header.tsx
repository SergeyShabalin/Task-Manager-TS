import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RiTrelloFill } from 'react-icons/ri'
import { Button } from '@UI'
import { User } from '@/models/Users'
import { MdKeyboardArrowDown } from 'react-icons/md'
import useOpenClose from '@/hooks/UseOpenClose'
import Share from '@/components/Features/Share'
import Messages from '@/layouts/Main/Header/Messages'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import Logout from '@/layouts/Main/Header/Logout'
import Account from '@/layouts/Main/Header/Account'

import classes from './Header.module.css'
import { useActions } from '@/hooks/useActions/useActions'

export default function Header({ _id, email }: Partial<User>) {

	const navigate = useNavigate()
	const { userId, boardId } = useParams()
	const { getUsersOneBoard } = useActions()
	const { isOpen, onClose, onOpen } = useOpenClose()
	const messagesCount = useTypedSelector(state => state.user.messages.length)

	function backToGreeting() {
		if (_id) navigate(`/user/${userId}/greeting`)
	}

	function openShare(){
		if(boardId)	getUsersOneBoard(boardId)
		onOpen()
	}

	return (
		<div className={classes.header}>

			<div className={classes.logo} onClick={backToGreeting}>
				<span className={classes.icon}>
					<RiTrelloFill />
				</span>
			<span>TASK MANAGER</span>
		</div>
			<div className={classes.share}>
				<Button title='Поделиться' endIcon={<MdKeyboardArrowDown />} onClick={openShare} />
				{isOpen && <Share onClose={onClose} />}
			</div>

			<div className={classes.control}>
				<Account/>
				<Messages messagesCount={messagesCount}/>
				<Logout/>
			</div>


		</div>
	)
}
