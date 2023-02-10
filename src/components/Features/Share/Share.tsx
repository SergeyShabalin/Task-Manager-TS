import React, { useRef, useState } from 'react'
import classes from './Share.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { Button, Input } from '@UI'

interface ShareProps {
	onClose: () => void
}

export default function Share({ onClose }: ShareProps) {
	const shareRef = useRef(null)
	const [email, setEmail] = useState('')
	useOnClickOutside(shareRef, () => onClose())

	function changeInput({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setEmail(target.value)
	}

	function saveChanged(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (e.code === 'Enter') void sendShare()
	}

	function sendShare() {
		console.log(email)
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
					<Button title='Поделиться' variant='contained' color='primary' onClick={sendShare} />
				</div>
			</div>

			<div className={classes.users}>
				<span className={classes.user_span}>Пользователи доски</span>
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
