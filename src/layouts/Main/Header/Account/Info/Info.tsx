import React, { useRef } from 'react'
import classes from './Info.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'

interface InfoProps{
	closeInfo: ()=>void
}

export default function Info({closeInfo}:InfoProps) {
	const navigate = useNavigate()
	const { logOut } = useActions()
	const user = useTypedSelector(state => state.user)
	const accountRef = useRef(null)
	useOnClickOutside(accountRef, () => closeInfo())


	function backToGreeting(){
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
 				<span className={classes.icon}>
				   {user.email[0]}
				 </span>
					<div className={classes.names}>
						<div className={classes.firstName}>{user.firstName}{' '}{user.secondName}</div>
						<div className={classes.email}>{user.email}</div>
					</div>
			</div>
			<hr/>
			<h1>Task Manager</h1>
			<ul>
				<li onClick={backToGreeting}>Рабочие пространства</li>
				<li onClick={logout}>Выход</li>
			</ul>
		</div>
	)
}

