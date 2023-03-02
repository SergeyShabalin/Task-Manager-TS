import React, { useRef, useState } from 'react'
import classes from './Account.module.css'
import { SlUser } from 'react-icons/sl'

import { Button, Hint } from '@UI'

import Info from '@/layouts/Main/Header/Account/Info'

interface AccountProps{

}

export default function Account() {

	const [isHint, setIsHint] = useState(false)
	const [isAccount, setIsAccount] = useState(false)

	function closeInfo(){
		setIsAccount(false)
	}
	function openInfo(){
		setIsAccount(true)
	}

	function showHint() {
		setIsHint(true)
	}
	function closeHint() {
		setIsHint(false)
	}

	return (
		< >
			<div className={classes.user} onMouseOver={showHint} onMouseOut={closeHint} >
				<Button icon={<SlUser/> } onClick={openInfo}/>
				<Hint visible = {isHint} label='Аккаунт'/>
			</div>

			{isAccount && <Info closeInfo={closeInfo} /> }
		 </>
	)
}

