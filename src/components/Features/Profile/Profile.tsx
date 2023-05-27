import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import { useActions } from '@/hooks/useActions/useActions'
import { useNavigate, useParams } from 'react-router-dom'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { UserAC } from '@/store/user/action'
import { useDispatch } from 'react-redux'
import Header from '@/layouts/Main/Header'
import ProfileHeader from '@/components/Features/Profile/ProfileHeader'
import Info from '@/components/Features/Profile/Info'



export default function Profile() {
	const { userId } = useParams()
	const { getUserInfo } = useActions()

	const user = useTypedSelector(state => state.user.profileUser)

	useEffect(() => {
		if (userId) getUserInfo(userId)
	}, [userId])


	return (
		<div className={classes.wrapper}>
			<div className={classes.header}><Header /></div>
			<div className={classes.content}>
				<ProfileHeader user = {user}/>
				<Info user = {user} />
			</div>

		</div>
	)
}
