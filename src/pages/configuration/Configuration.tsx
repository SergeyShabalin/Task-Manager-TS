import React from 'react'
import classes from './Configuration.module.css'
import Header from '@/layouts/Main/Header'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

import Profile from '@/pages/configuration/Profile'

export default function Configuration() {

	const user = useTypedSelector(state => state.user)

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<Header _id={user._id} email={user.email} />
			</div>
			<Profile />
		</div>
	)
}
