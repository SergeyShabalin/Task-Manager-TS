import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './Info.module.css'

interface InfoProps {
	closeInfo: () => void
}

export default function Info({ closeInfo }: InfoProps) {
	const navigate = useNavigate()
	const { logOut, backToGreeting } = useActions()
	const user = useTypedSelector(state => state.user)
	const accountRef = useRef(null)
	useOnClickOutside(accountRef, () => closeInfo())

	function backInGreeting() {
		if (user._id) navigate(`/user/${user._id}/greeting`)
		backToGreeting()
	}

	function logout() {
		logOut()
		navigate(`/login`)
	}

	return (
		<div className={classes.wrapper} ref={accountRef}>
			<h1>Учетная запись</h1>
			<div className={classes.info}>
				<span className={classes.icon}>{user.email[0].toUpperCase()}</span>
				<div className={classes.names}>
					<div className={classes.firstName}>{user.secondName}{' '}{user.firstName}</div>
					<div className={classes.email}>{user.email}</div>
				</div>
			</div>
			<hr />
			<ul>
				<li onClick={backInGreeting}>Рабочие пространства</li>
				<li onClick={logout}>Выход</li>
			</ul>
		</div>
	)
}
