import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import { useActions } from '@/hooks/useActions/useActions'
import { useNavigate, useParams } from 'react-router-dom'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { UserAC } from '@/store/user/action'
import { useDispatch } from 'react-redux'

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
			профайл пользователя
			<img src={user.background} />
			<div>{user.firstName}</div>
			<div>{user.lastName}</div>
			<div>{user.secondName}</div>
			<div>{user.department}</div>
			<div>{user.position}</div>
			<div>{user.organization}</div>
			<div>{user.birthDate}</div>
			<div>{user.email}</div>
			<img src={user.avatar} />

			<div>{user.organization}</div>

			<Button onClick={back} title={'назад'} variant={'outlined'} />
		</div>
	)
}

