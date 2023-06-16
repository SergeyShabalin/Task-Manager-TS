import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from '@UI'
import { BiShowAlt } from 'react-icons/bi'

import { useActionsToolkit } from '@/hooks/useActions/toolkit/useActions'
import classes from './Login.module.css'

export default function Login() {
	const [isPass, setIsPass] = useState(true)

	const navigate = useNavigate()
	const { login } = useActionsToolkit()
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
		if (userId) navigate(`/user/${userId}/greeting`)
	}

	return (
		<form className={classes.wrapper}>
			<div className={classes.controller}>
				<h2 className={classes.title}>Авторизация</h2>
				<Input
					color='transparent'
					placeholder='email'
					name='email'
					value={form.email}
					onChange={onSubmit}
				/>

				<Input
					iconRight={
						<div className={classes.control_pass} onClick={changePassView}>
							<BiShowAlt />
						</div>
					}
					type={!isPass ? 'text' : 'password'}
					color='transparent'
					placeholder='пароль'
					name='password'
					value={form.password}
					onChange={onSubmit}
				/>

				<div className={classes.footer}>
					<div className={classes.btn_add}>
						<Button
							onClick={handleSubmit}
							title='Войти'
							fullSize
							variant='contained'
							color='primary'
						/>
					</div>
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
