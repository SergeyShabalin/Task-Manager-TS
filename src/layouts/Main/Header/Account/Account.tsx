import React, { useState } from 'react'

import { SlUser } from 'react-icons/sl'
import { Button, Hint } from '@UI'
import Info from '@/layouts/Main/Header/Account/Info'
import classes from './Account.module.css'

export default function Account() {
	const [isHint, setIsHint] = useState(false)
	const [isAccount, setIsAccount] = useState(false)

	function closeInfo() {
		setIsAccount(false)
	}

	function openInfo() {
		setIsAccount(true)
	}

	function showHint() {
		setIsHint(true)
	}

	function closeHint() {
		setIsHint(false)
	}

	return (
		<>
			<div className={classes.user} onMouseOver={showHint} onMouseOut={closeHint}>
				<Button icon={<SlUser />} onClick={openInfo} />
				<Hint visible={isHint} label='Аккаунт' />
			</div>
			{isAccount && <Info closeInfo={closeInfo} />}
		</>
	)
}
