import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './Info.module.css'
import BoardCreator from '@/components/Features/BoardCreator'

interface InfoProps {
	closeInfo: () => void
}

export default function Info({ closeInfo }: InfoProps) {
	const navigate = useNavigate()
	const { logOut } = useActions()
	const user = useTypedSelector(state => state.user)
	const accountRef = useRef(null)
	useOnClickOutside(accountRef, () => closeInfo())

	function backToGreeting() {
		if (user._id) navigate(`/user/${user._id}/greeting`)
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
					<div className={classes.firstName}>{user.firstName}</div>
					<div className={classes.email}>{user.email}</div>
				</div>
			</div>
			<hr />
			<ul>
				<li onClick={backToGreeting}>Рабочие пространства</li>
				<li onClick={logout}>Выход</li>
			</ul>
		</div>
	)
}
