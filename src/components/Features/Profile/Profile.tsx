import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import { useActions } from '@/hooks/useActions/useActions'
import { useNavigate, useParams } from 'react-router-dom'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { UserAC } from '@/store/user/action'
import { useDispatch } from 'react-redux'
import Header from '@/layouts/Main/Header'

export default function Profile() {
	const { userId } = useParams()
	const { getUserInfo } = useActions()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useTypedSelector(state => state.user.profileUser)

	useEffect(() => {
		if (userId) getUserInfo(userId)
	}, [])

	function back() {
		const prevRef = localStorage.getItem('prevLocation')
		if (prevRef) navigate(prevRef)
		dispatch(UserAC.clearUserInfo())
	}

	return (
		<div className={classes.wrapper}>
	<div className={classes.header}>	<Header/></div>
			<div className={classes.content}>
				<div className={classes.photo}>
					<img className={classes.background_img} src={user.background} />
					<div className={classes.avatar}><img className={classes.avatar_img} src={user.avatar} /></div>
				</div>

				<div>{user.firstName}</div>
				<div>{user.lastName}</div>
				<div>{user.secondName}</div>
				<div>{user.department}</div>
				<div>{user.position}</div>
				<div>{user.organization}</div>
				<div>{user.email}</div>

				<div>{user.organization}</div>
				<Button onClick={back} title={'назад'} variant={'outlined'} />
			</div>

		</div>
	)
}
