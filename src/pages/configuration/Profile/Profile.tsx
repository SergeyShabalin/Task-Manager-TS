import React from 'react'
import Photo from '@/pages/configuration/Profile/Photo'
import PersonalInfo from '@/pages/configuration/Profile/PersonalInfo'
import Safety from '@/pages/configuration/Profile/Safety'
import Email from '@/pages/configuration/Profile/Email'

import classes from './Profile.module.css'


export default function Profile() {

	return (
		<div className={classes.wrapper}>
			<h1 className={classes.title_profile}>Настройки профиля</h1>
			<div className={classes.content}>
				<Photo />
				<PersonalInfo />
				<Safety/>
				<Email/>
			</div>
		</div>
	)
}
