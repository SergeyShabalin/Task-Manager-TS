import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { MdSpaceDashboard } from 'react-icons/md'
import { FaUserCog } from 'react-icons/fa'
import { IoExitSharp } from 'react-icons/all'
import { RiFileUserFill } from 'react-icons/ri'

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
	const { boardId } = useParams()
	const user = useTypedSelector(state => state.user)
	const socket = user.socket
	const accountRef = useRef(null)
	useOnClickOutside(accountRef, () => closeInfo())

	function backInGreeting() {
		if (user._id) navigate(`/user/${user._id}/greeting`)
		if (boardId) backToGreeting(boardId)
		closeInfo()
	}

	function logout() {
		const confirm = window.confirm('Выйти из учетной записи?')
		if (confirm) {
			socket?.emit('LEAVE_USER', user._id)
			socket?.emit('LEAVE_BOARD', boardId)
			logOut()
			navigate(`/login`)
		}
	}

	function goToConfiguration() {
		if (user._id) navigate(`/user/${user._id}/configuration`)
		closeInfo()
	}

	function goToMyProfile() {
		const userId = localStorage.getItem('user_authenticated')
		if (userId) navigate(`/user/${userId}/profile`)
		 closeInfo()
	}

	return (
		<div className={classes.wrapper} ref={accountRef}>
			<h1>Учетная запись</h1>
			<div className={classes.info}>
				<div className={classes.background}>
					{user.background && <img className={classes.background_img} src={user.background} />}
				</div>
				<div className={classes.avatar_wrapper}>
					{user.avatar ? (
						<div className={classes.avatar}>
							<img className={classes.img} src={user.avatar} />
						</div>
					) : (
						<span className={classes.icon}>{user.email[0].toUpperCase()}</span>
					)}
				</div>

				<div className={classes.user_names}>
					<h1 className={classes.firstName}>
						{user.secondName} {user.firstName}
					</h1>
					<span className={classes.email}>{user.email}</span>
				</div>
			</div>
			<hr />
			<ul>
				<li onClick={backInGreeting} className={classes.li_account}>
					<MdSpaceDashboard className={classes.icon_li} /> Мои текущие доски
				</li>
				<li onClick={goToMyProfile} className={classes.li_account}>
					<RiFileUserFill className={classes.icon_li} />
					Мой профиль
				</li>
				<li onClick={goToConfiguration} className={classes.li_account}>
					<FaUserCog className={classes.icon_li} />
					Настройки
				</li>
				<li onClick={logout} className={classes.li_account}>
					<IoExitSharp className={classes.icon_li} />
					Выход
				</li>
			</ul>
		</div>
	)
}
