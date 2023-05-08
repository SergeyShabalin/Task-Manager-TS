import React from 'react'
import classes from './Configuration.module.css'
import { Button } from '@UI'
import { useNavigate, useParams } from 'react-router-dom'

export default function Configuration(){

	const navigate = useNavigate()
	const { userId } = useParams()

	function openPage(page: string){
	if(userId)	navigate(`/user/${userId}/configuration/${page}`)
	}

	return (
		<div className={classes.btn_config_area}>
			<div className = {classes.btn_config}>
				<Button title='Профиль' color={'primary'} onClick={() => openPage('profile')} />
			</div>
			<div className = {classes.btn_config}>
				<Button title='Электронная почта'  onClick={() => openPage('email')} />
			</div>
			<div className = {classes.btn_config}>
				<Button title='Безопасность'  onClick={() => openPage('safety')} />
			</div>
		</div>
	)
}

