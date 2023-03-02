import React, { useEffect, useState } from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import { RiTrelloFill } from 'react-icons/ri'
import { MdLogout } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import classes from './Header.module.css'
import { Button, Hint } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'

import { User } from '@/models/Users'
import { MdKeyboardArrowDown } from 'react-icons/md'
import useOpenClose from '@/hooks/UseOpenClose'
import Share from '@/components/Features/Share'
import Messages from '@/layouts/Main/Header/Messages'

import { BiUser } from 'react-icons/bi'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import Logout from '@/layouts/Main/Header/Logout'
import Account from '@/layouts/Main/Header/Account'


export default function Header({ _id, email }: Partial<User>) {

	const navigate = useNavigate()
	const { userId } = useParams()
	const { isOpen, onClose, onOpen } = useOpenClose()
	const messagesCount = useTypedSelector(state => state.user.messages.length)

	function backToGreeting() {
		if (_id) navigate(`/user/${userId}/greeting`)
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
				<Button title='Поделиться' endIcon={<MdKeyboardArrowDown />} onClick={onOpen} />
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
