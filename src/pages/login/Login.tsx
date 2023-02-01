import React, { useState } from 'react'
import { Button, Input } from '@UI'
import { BiShowAlt } from 'react-icons/bi'

import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '@/hooks/useActions/useActions'

import classes from './Login.module.css'

export default function Login() {
	const [isPass, setIsPass] = useState(true)

	const navigate = useNavigate()
	const { login } = useActions()
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	function changePassView(e: React.FormEvent) {
		e.preventDefault()
		setIsPass(!isPass)
	}

	function onSubmit(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (e.target) {
			setForm(prev => ({
				...prev,
				[e.target.name]: e.target.value
			}))
		}
	}


	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		const userId = await login(form)
		if (userId!) navigate(`/user/${userId}`)
	}

	return (
		<form className={classes.wrapper}>
			<div className={classes.controller}>
				<h2 className={classes.title}>Авторизация</h2>
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
						// autocomplete='off'
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
					<Button onClick={handleSubmit} title='Войти' variant='contained' color='primary' />
				</div>
				<div className={classes.link_wrapper}>
					<span>Еще нет аккаунта? </span>
					<Link to={'/registration'} className={classes.link}>
						Зарегистрироваться
					</Link>
				</div>
			</div>
		</form>
	)
}
