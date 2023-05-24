import React, { useState } from 'react'
import { Hint } from '@UI'
import { userOneCard } from '@/models/Users'

import classes from './User.module.css'


interface UserProps {
	user: userOneCard
}

export default function User({ user }: UserProps) {

	const [isHint, setIsHint] = useState(false)

	function showHint() {setIsHint(true)}

	function closeHint() {setIsHint(false)}

	return (
		<div className={classes.user} onMouseOver={showHint} onMouseOut={closeHint}>
			{isHint && <div className={classes.hint}><Hint label={user.email} visible={isHint} /></div>}
			{user.avatar ? (
				 <img className={classes.user_avatar} src={user.avatar} />
			) : (
				<div className={classes.empty_avatar}>
					{user.secondName[0].toUpperCase() + user.firstName[0].toUpperCase()}
				</div>
			)}
		</div>
	)
}
