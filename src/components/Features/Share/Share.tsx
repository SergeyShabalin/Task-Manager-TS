import React, { useRef, useState } from 'react'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { Button, Input } from '@UI'
import {useActions} from "@/hooks/useActions/useActions";
import classes from './Share.module.css'
import {useParams} from "react-router-dom";

interface ShareProps {
	onClose: () => void
}

export default function Share({ onClose }: ShareProps) {
	const shareRef = useRef(null)
	const [email, setEmail] = useState('')
	const { shareBoard } = useActions()
	const { userId, boardId } = useParams()
	useOnClickOutside(shareRef, () => onClose())

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
		 shareBoard(payload)
	}

	return (
		<div className={classes.wrapper} ref={shareRef}>
			<div className={classes.header}>Поделиться доской</div>
			<hr />
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
			<span className={classes.user_span}>Текущие пользователи</span>
			<div className={classes.users}>

				<div className={classes.user_list}>
					<div className={classes.user}>
						<div className={classes.avatar}>S</div>
						<div className={classes.user_info}>
							<div className={classes.email}>Serg@mail.ru</div>
							<div className={classes.name}>Шабалин Сергей Валерьевич</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}
