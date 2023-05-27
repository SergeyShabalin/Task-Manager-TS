import React from 'react'
import classes from './Configuration.module.css'

import Profile from '@/pages/configuration/Profile'

export default function Configuration() {

	return (
		<div className={classes.wrapper}>
			<Profile />
		</div>
	)
}
