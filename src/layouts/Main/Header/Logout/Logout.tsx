import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Hint } from '@UI'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './Logout.module.css'

export default function Logout() {
	const { logOut } = useActions()
	const navigate = useNavigate()
	const [isHint, setIsHint] = useState(false)

	function showHint() {
		setIsHint(true)
	}

	function closeHint() {
		setIsHint(false)
	}

	function logout() {
		const confirm = window.confirm('Выйти из учетной записи?')
		if (confirm) {
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

