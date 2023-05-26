import React from 'react'
import classes from './ProfileHeader.module.css'

import { User } from '@/models/Users'

interface ProfileHeaderProps {
	user: Partial<User>
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
	return (
			<div className={classes.photo}>
				<img className={classes.background_img} src={user.background} />
				<div className={classes.avatar}><img className={classes.avatar_img} src={user.avatar} /></div>
				<div className={classes.person_name}>
					<h1 className={classes.second_name}>{user.secondName}</h1>
					<h1 className={classes.first_name}>{user.firstName}</h1>
				</div>
			</div>
	)
}
