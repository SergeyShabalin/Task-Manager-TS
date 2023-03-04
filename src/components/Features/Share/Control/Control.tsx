import React, { useState } from 'react'
import classes from './Control.module.css'
import { Button, Input } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import { useParams } from 'react-router-dom'

interface ControlProps {
	changeShare: (value: boolean) => boolean
}

export default function Control({ changeShare }: ControlProps) {
	const { shareBoard } = useActions()
	const { userId, boardId } = useParams()
	const [email, setEmail] = useState('')
	function changeInput({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setEmail(target.value)
	}

	function saveChanged(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (e.code === 'Enter') void sendShare()
	}

	async function sendShare() {
		const payload = {
			email,
			_id: userId,
			boardId
		}
		const targetUser = await shareBoard(payload)
		if (!targetUser) changeShare(false)
		else changeShare(true)
	}

	return (
		<div className={classes.email_input}>
			<div className={classes.input}>
				<Input
					autoFocus
					autoComplete='off'
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
