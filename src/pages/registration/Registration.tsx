import React, { useState } from 'react'
import { BiShowAlt } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import { useActions } from '@/hooks/useActions/useActions'
import { Button, Input } from '@UI'
import 'react-datepicker/dist/react-datepicker.css'
import classes from './Registration.module.css'

export default function Registration() {
	const { registration } = useActions()
	const navigate = useNavigate()

	const [form, setForm] = useState({
		email: '',
		password: '',
		firstName: '',
		secondName: '',
		lastName: ''
	})
	const [isPass, setIsPass] = useState(true)

	function changePassView(e: React.FormEvent) {
		e.preventDefault()
		setIsPass(!isPass)
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		const userId = await registration(form)
		if (userId) navigate(`/user/${userId}`)
	}

	function onSubmit(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (e.target) {
			setForm(prev => ({
				...prev,
				[e.target.name]: e.target.value
			}))
		}
	}

	return (
		<form className={classes.wrapper}>
			<div className={classes.greeting}>
				<div className={classes.one}>WELCOME TO</div>
				<div className={classes.two}>TASK MANAGER</div>
			</div>
			<div className={classes.controller}>
				<h2 className={classes.title}>Регистрация</h2>
				<Input
					// autocomplete='off'
					color='transparent'
					placeholder='фамилия'
					name='secondName'
					value={form.secondName}
					onChange={onSubmit}
				/>
				<Input
					// autocomplete='off'
					color='transparent'
					placeholder='имя'
					name='firstName'
					value={form.firstName}
					onChange={onSubmit}
				/>
				<Input
					// autocomplete='off'
					color='transparent'
					placeholder='отчество'
					name='lastName'
					value={form.lastName}
					onChange={onSubmit}
				/>
				<Input
					// autocomplete='off'
					color='transparent'
					placeholder='email'
					name='email'
					value={form.email}
					onChange={onSubmit}
				/>
				<div className={classes.password}>
					<Input
						type={isPass && 'password'}
						// autocomplete='new-password'
						color='transparent'
						placeholder='пароль'
						name='password'
						value={form.password}
						onChange={onSubmit}
					/>
					<div className={classes.control_pass}>
						<Button icon={<BiShowAlt />} onClick={changePassView} />
					</div>
				</div>

				<div className={classes.footer}>
					<Button onClick={handleSubmit} title='Регистрация' variant='contained' color='primary' />
				</div>
				<div className={classes.link_wrapper}>
					<span>Уже есть аккаунт?</span>
					<Link to={'/login'} className={classes.link}>
						Войти
					</Link>{' '}
				</div>
			</div>
		</form>
	)
}
