import React from 'react'
import Photo from '@/pages/configuration/Profile/Photo'

import classes from './Profile.module.css'
import PersonalInfo from '@/pages/configuration/Profile/PersonalInfo'

export default function Profile() {
	return (
		<div className={classes.wrapper}>
			<h1 className={classes.title_profile}>Настройки профиля</h1>
			<div className={classes.content}>
				<Photo />
				<PersonalInfo />
			</div>
		</div>
	)
}
