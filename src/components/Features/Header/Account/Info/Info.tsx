import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { MdSpaceDashboard } from 'react-icons/md'
import { FaUserCog } from 'react-icons/fa'
import { IoExitSharp } from 'react-icons/all'
import { RiFileUserFill } from 'react-icons/ri'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './Info.module.css'
import { useActionsToolkit } from '@/hooks/useActions/toolkit/useActions'
import Loader from '@/components/UI/Loader'


interface InfoProps {
	closeInfo: () => void
}

export default function Info({ closeInfo }: InfoProps) {
	const navigate = useNavigate()
	const { backToGreeting } = useActions()
	const { logOut } = useActionsToolkit()
	const { boardId } = useParams()
	const user = useTypedSelector(state => state.user.userState)
	const accountRef = useRef(null)
	const [onLoadAvatar, setOnLoadAvatar] = useState(false)
	const [onLoadBackground, setOnLoadBackground] = useState(false)
	useOnClickOutside(accountRef, () => closeInfo())

	function backInGreeting() {
		if (user._id) navigate(`/user/${user._id}/greeting`)
		if (boardId) backToGreeting(boardId)
		closeInfo()
	}

	function logout() {
		const confirm = window.confirm('Выйти из учетной записи?')
		if (confirm) {
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

	function handleAvatarLoad() {
		setOnLoadAvatar(true)
	}

	function handleBackgroundLoad() {
		setOnLoadBackground(true)
	}


	return (
		<div className={classes.wrapper} ref={accountRef}>
			
			<div className={classes.info}>
				{!(onLoadAvatar && onLoadBackground) &&
					<div className={classes.loader}>
						<span className={classes.hint_load}>Загрузка...</span>
						<Loader variant='local'  color='lds-black' />
					</div>
				}
				<div className={classes.background}>
					{user.background &&
						<img onLoad={handleBackgroundLoad} className={classes.background_img} src={user.background} />
					}
				</div>

				<div className={classes.avatar_wrapper}>
					{user.avatar ? (
						<div className={classes.avatar}>
							<img onLoad={handleAvatarLoad} className={classes.img} src={user.avatar} />
						</div>
					) : (
						<span className={classes.icon}>{user.email[0]?.toUpperCase()}</span>
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
