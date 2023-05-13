import React, { useState } from 'react'
import Profile from '@/pages/configuration/Profile'
import Email from '@/pages/configuration/Email'
import Safety from '@/pages/configuration/Safety'
import classes from './Main.module.css'

interface MainProps {
	profile: boolean
	email: boolean
	safety: boolean
}

export default function Main({ profile, email, safety }: MainProps) {


	return (
		<div className={classes.wrapper}>
			{profile && <Profile />}
			{email && <Email />}
			{safety && <Safety />}

		</div>
	)
}
