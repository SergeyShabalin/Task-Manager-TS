import React, { useState } from 'react'
import classes from './Safety.module.css'
import { Button, Input, Notification } from '@UI'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import { BiShowAlt } from 'react-icons/bi'

export default function Safety() {
	const _id = useTypedSelector(state => state.user._id)
	const initState = {
		_id,
		oldPass: '',
		newPass: '',
		email: ''
	}

	const { changePersonalInfo } = useActions()
	const [form, setForm] = useState(initState)
	const [isPass, setIsPass] = useState(true)

	function changePassView(e: React.FormEvent) {
		e.preventDefault()
		setIsPass(!isPass)
	}

	function onSubmit(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault()

		if (!e.target) return

		setForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}


	function savePassword(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const confirm = window.confirm('Изменить пароль?')
		if (confirm) {
			changePersonalInfo(form)
			setForm(initState)
		}
	}

	return (
		<form onSubmit={savePassword}>
			<span className={classes.title_safety}>Изменение пароля</span>
			<div className={classes.wrapper}>
				<div className={classes.control}>
					<span className={classes.placeholder}>Введите старый пароль</span>

					<Input
						color='blue'
						type={!isPass ? 'text' : 'password'}
						variant='large'
						name='oldPass'
						value={form.oldPass}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Введите старый пароль</span>
					<Input
						color='blue'
						type={!isPass ? 'text' : 'password'}
						variant='large'
						name='newPass'
						value={form.newPass}
						onChange={onSubmit}
					/>
				</div>
				<div className={classes.btn_wrapper}>
					<div className={classes.control_pass} onClick={changePassView}>
						<BiShowAlt />
					</div>
					{form.oldPass && form.newPass &&	<Button title='Сохранить' color='primary' type='submit' variant='contained' />}
				</div>
			</div>
		</form>
	)
}
