import React, { useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { userOneCard } from '@/models/Users'
import classes from './UserPreview.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'


interface UserPreviewProps {
	closePreview: () => void
	user: userOneCard
}

export default function UserPreview({ closePreview, user }: UserPreviewProps) {

	const previewRef = useRef(null)
	const navigate = useNavigate()
	useOnClickOutside(previewRef, () => closePreview())
	const socket = useTypedSelector(state => state.user.socket)
	const {cardId, userId} = useParams()

	function openProfile() {
		if (user._id) navigate(`/user/${user._id}/profile`)
		if(userId) localStorage.setItem('user_authenticated', userId)
	}

	function deleteUserFromCard(){
		const payload = {
			userId: user._id, cardId
		}
		if (socket) socket.emit('ADD_MEMBER_ONE_CARD', payload)
	}

	return (
		<div className={classes.wrapper} ref={previewRef}>
			<div className={classes.avatar}>
				<img src={user.avatar} />
			</div>
			<div className={classes.name}>
				<h1>{user.firstName}</h1>
				<h1>{user.secondName}</h1>
			</div>

			<ul>
				<li onClick={openProfile}>Открыть профиль</li>
				<li onClick={deleteUserFromCard}>Удалить с карточки</li>
			</ul>
		</div>
	)
}
