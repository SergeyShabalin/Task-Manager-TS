import React, { useState } from 'react'
import classes from './Safety.module.css'
import { Button, Input } from '@UI'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'

export default function Safety() {
	const {changeUser} = useActions()
	const _id = useTypedSelector(state => state.user._id)
	const [form, setForm] = useState({
		_id,
		oldPass: '',
		newPass: ''
	})

	function onSubmit(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		e.preventDefault()

		if (!e.target) return

		setForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))

	}


	function savePassword(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		changeUser(form)
	}

	return (
		<form onSubmit={savePassword}>
			<span className={classes.title_safety}>Изменение пароля</span>
			<div className={classes.wrapper}>
				<div className={classes.control}>
					<span className={classes.placeholder}>Введите старый пароль</span>
					<Input
						color='blue'
						variant='large'
						name='oldPass'
						value={form.oldPass}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Введите старый пароль</span>
					<Input
						color='blue'
						variant='large'
						name='newPass'
						value={form.newPass}
						onChange={onSubmit}
					/>
				</div>
				<div className={classes.btn_wrapper}>
					<Button title='Сохранить' color='primary' type='submit' variant='contained' />
				</div>
			</div>
		</form>
	)
}
