import React, { useState } from 'react'
import classes from './Configuration.module.css'
import Header from '@/layouts/Main/Header'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

import Main from '@/pages/configuration/Main'
import { useLocation } from 'react-router-dom'


export default function Configuration() {

	const location = useLocation()
	const route = location.pathname.split('/')
	const page = route[route.length - 1].toString()
	const user = useTypedSelector(state => state.user)

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<Header _id={user._id} email={user.email} />
			</div>
			<Main page={page} />

		</div>
	)
}
