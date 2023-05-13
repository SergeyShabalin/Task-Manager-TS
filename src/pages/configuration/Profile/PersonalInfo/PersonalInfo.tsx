import React, { useState } from 'react'
import { Button, Input } from '@UI'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'

import classes from './PersonalInfo.module.css'

export default function PersonalInfo() {
	const userInfo = useTypedSelector(state => state.user)
	const {changeUser} = useActions()
	const [form, setForm] = useState(userInfo)

	function onSubmit(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		e.preventDefault()

		if (!e.target) return

			setForm(prev => ({
				...prev,
				[e.target.name]: e.target.value
			}))

	}

	function saveInfo(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		changeUser(form)
	}

	return (
		<form className={classes.wrapper} onSubmit={saveInfo}>
			<header className={classes.title}>Информация о пользователе</header>
			<div className={classes.person_wrapper}>
				<div className={classes.control}>
					<span className={classes.placeholder}>Фамилия</span>
					<Input
						color='blue'
						variant='large'
						name='secondName'
						value={form.secondName}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Имя</span>
					<Input
						color='blue'
						variant='large'
						name='firstName'
						value={form.firstName}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Отчество</span>
					<Input
						color='blue'
						variant='large'
						name='lastName'
						value={form.lastName}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Email</span>
					<Input
						color='blue'
						variant='large'
						name='email'
						value={form.email}
						onChange={onSubmit}
					/>
				</div>

				<div className={classes.btn_wrapper}>
					<Button
						title='Сохранить'
						color='primary'
						type='submit'
						variant='contained'
					/>
				</div>
			</div>
		</form>
	)
}
