import React, { useState } from 'react'
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


export default function Header({ _id, email }: Partial<User>) {
	const { logOut } = useActions()
	const navigate = useNavigate()
	const { userId } = useParams()
	const { isOpen, onClose, onOpen } = useOpenClose()
	const [isHint, setIsHint] = useState(false)

	function showHint() {
		setIsHint(true)
	}
	function closeHint() {
		setIsHint(false)
	}

	function logout() {
		logOut()
		navigate(`/login`)
	}

	function backToGreeting() {
		if (_id) navigate(`/user/${userId}/greeting`)
	}

	return (
		<div className={classes.header}>
			<div className={classes.menu}>
				<Button icon={<CgMenuGridO />} onClick={backToGreeting} />
			</div>
			<div className={classes.share}>
				<Button title='Поделиться' endIcon={<MdKeyboardArrowDown />} onClick={onOpen} />
				{isOpen && <Share onClose={onClose} />}
			</div>

			<div className={classes.user}><BiUser/> <span className={classes.email}>{email}</span></div>

			<div className={classes.control}>
				<Messages />
				<div className={classes.logout} onMouseOver={showHint} onMouseOut={closeHint}>
					<Button icon={<MdLogout />} onClick={logout} />
					{/*TODO вынести в отдельный компонент*/}
					<Hint visible = {isHint} label='Выйти из учетной записи'/>
				</div>
			</div>

			<div className={classes.logo}>
				<span className={classes.icon}>
					<RiTrelloFill />
				</span>

				<span>TASK MANAGER</span>
			</div>
		</div>
	)
}
