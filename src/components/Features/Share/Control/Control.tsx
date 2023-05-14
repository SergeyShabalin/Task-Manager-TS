import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Input } from '@UI'
import classes from './Control.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'


export default function Control() {
	const [email, setEmail] = useState('')
	const socket = useTypedSelector(state => state.user.socket)
	const { userId, boardId } = useParams()


	function changeInput({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setEmail(target.value)
	}

	function saveChanged(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (e.code === 'Enter') void sendShare()
	}

	function sendShare() {
		const payload = {
			email,
			_id: userId,
			boardId
		}
		socket?.emit('SHARE_BOARD', payload)
	}

	return (
		<div className={classes.email_input}>
			<div className={classes.input}>
				<Input
					autoFocus

					rows={1}
					defaultValue={email}
					color='outlined'
					placeholder='Введите электронную почту'
					onKeyDown={saveChanged}
					onChange={changeInput}
				/>
			</div>
			<div className={classes.control}>
				<Button title='Поделиться' variant='outlined' color='primary' onClick={sendShare} />
			</div>
		</div>
	)
}
