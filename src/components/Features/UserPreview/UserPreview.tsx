import React, { useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { userOneCard } from '@/models/Users'
import classes from './UserPreview.module.css'


interface UserPreviewProps {
	closePreview: () => void
	user: userOneCard
}

export default function UserPreview({ closePreview, user }: UserPreviewProps) {

	const previewRef = useRef(null)
	const navigate = useNavigate()
	const location = useLocation()
	useOnClickOutside(previewRef, () => closePreview())


	function openProfile() {
		if (user._id) navigate(`/user/${user._id}/profile`)
		localStorage.setItem('prevLocation', location.pathname)
	}

	return (
		<div className={classes.wrapper} ref={previewRef}>
			<div className={classes.avatar}><img src={user.avatar} /></div>
			<h1>{user.firstName}</h1>
			<h1>{user.secondName}</h1>
			<ul>
				<li onClick={openProfile}>Открыть профиль</li>
				<li>Удалить с карточки</li>
			</ul>
		</div>
	)
}
