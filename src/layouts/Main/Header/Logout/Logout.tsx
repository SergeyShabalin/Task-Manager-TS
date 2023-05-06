import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Hint } from '@UI'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './Logout.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

interface LogoutProps{
	boardId?: string
	userId?: string
}

export default function Logout({boardId, userId}: LogoutProps ) {
	const { logOut } = useActions()
	const navigate = useNavigate()
	const [isHint, setIsHint] = useState(false)
	const socket = useTypedSelector(({ user }) => user.socket)

	function showHint() {
		setIsHint(true)
	}

	function closeHint() {
		setIsHint(false)
	}

	function logout() {
		const confirm = window.confirm('Выйти из учетной записи?')
		if (confirm) {
			socket?.emit('LEAVE_USER', userId)
			socket?.emit('LEAVE_BOARD', boardId)
			logOut()
			navigate(`/login`)
		}
	}

	return (
		<div className={classes.logout} onMouseOver={showHint} onMouseOut={closeHint}>
			<Button icon={<RiLogoutCircleRLine />} onClick={logout} />
			<Hint visible={isHint} label='Выйти из учетной записи' />
		</div>
	)
}
