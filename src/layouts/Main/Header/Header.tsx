import React from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import { RiTrelloFill } from 'react-icons/ri'
import { MdLogout } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import classes from './Header.module.css'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'

import { User } from '@/models/Users'

export default function Header({ _id }: Partial<User>, ) {
	const { logOut } = useActions()
	const navigate = useNavigate()
	const {userId} = useParams()

	function logout() {
		logOut()
		navigate(`/login`)
	}

	function backToGreeting() {
		if (_id)	navigate(`/user/${userId}/greeting`)
	}

	return (
		<div className={classes.header}>
			<div className={classes.menu}>
				<Button variant='just_icon' icon={<CgMenuGridO />} onClick={backToGreeting} />
			</div>
			<div className={classes.logo}>
				<span className={classes.icon}>
					<RiTrelloFill />
				</span>
				<span>TASK MANAGER</span>
			</div>
			<div className={classes.logout}>
				<Button icon={<MdLogout />} onClick={logout} />
			</div>
		</div>
	)
}
