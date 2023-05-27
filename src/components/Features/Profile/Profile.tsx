import React, { useEffect } from 'react'
import classes from './Profile.module.css'
import { useActions } from '@/hooks/useActions/useActions'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

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
			<div className={classes.content}>
				<ProfileHeader user = {user}/>
				<Info user = {user} />
			</div>
		</div>
	)
}
