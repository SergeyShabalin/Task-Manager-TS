import React, { ChangeEvent, useState } from 'react'
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
	const [coordinates, setCoordinates] = useState({ left: 0, top: 0 })
	const firstInitial = user.firstName?.[0]?.toUpperCase()
	const secondInitial = user.secondName?.[0]?.toUpperCase()

	function showHint(e: any) {
		setIsHint(true)
		const rect = e.currentTarget.getBoundingClientRect()
		setCoordinates(rect)
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

	function handleAvatarLoad() {
		console.log('ватарки загружены')
	}

	return (
		<div
			className={classes.user}
			onMouseOver={showHint}
			onMouseOut={closeHint}
			onClick={openPreview}
		>
			{isPreview
				&& <div style={{
					position: 'fixed',
					left: coordinates.left-20,
					top: coordinates.top,
					zIndex: '6'
				}}>
					<UserPreview user={user} closePreview={closePreview} />
				</div>
			}
			{isHint && (
				<div
					className={classes.hint}
					style={{
						position: 'fixed',
						left: coordinates.left+15,
						top: coordinates.top-15,
						zIndex: '5'
					}}>
					<Hint label={user.email} visible={isHint} />
				</div>
			)}
			{user.avatar ? (
				<img onLoad={handleAvatarLoad} className={classes.user_avatar} src={user.avatar} />
			) : (
				<div className={classes.empty_avatar}>
					{firstInitial && secondInitial && firstInitial + secondInitial}
				</div>
			)}
		</div>
	)
}
