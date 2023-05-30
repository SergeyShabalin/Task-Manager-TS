import React, { useState } from 'react'


import { Button, Input } from '@UI'
import classes from './Control.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

interface ControlProps {
	boardId: string
}

export default function Control({ boardId }: ControlProps) {
	const [email, setEmail] = useState('')
	const socket = useTypedSelector(state => state.user.socket)
	const userId = useTypedSelector(({ user }) => user._id)



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
		console.log(payload)
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
