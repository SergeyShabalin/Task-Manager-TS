import React, { useState } from 'react'
import { Hint } from '@UI'
import { userOneCard } from '@/models/Users'

import classes from './User.module.css'
import UserPreview from '@/components/Features/UserPreview'


interface UserProps {
	user: userOneCard
}

export default function User({ user }: UserProps) {

	const [isHint, setIsHint] = useState(false)
	const [isPreview, setIsPreview] = useState(false)
	const firstInitial = user.firstName?.[0]?.toUpperCase()
	const secondInitial = user.secondName?.[0]?.toUpperCase()

	function showHint() {
		setIsHint(true)
	}

	function closeHint() {
		setIsHint(false)
	}

	function openPreview() {
		setIsPreview(true)
	}

	function closePreview() {
		setIsPreview(false)
	}

	return (
		<div className={classes.user} onMouseOver={showHint} onMouseOut={closeHint} onClick={openPreview}>
			{isPreview && <UserPreview user={user} closePreview={closePreview} />}
			{isHint && <div className={classes.hint}>
				<Hint label={user.email} visible={isHint} />
			</div>
			}
			{user.avatar ? (
				<img className={classes.user_avatar} src={user.avatar} />
			) : (
				<div className={classes.empty_avatar}>
					{firstInitial && secondInitial && firstInitial + secondInitial}
				</div>
			)}
		</div>
	)
}
