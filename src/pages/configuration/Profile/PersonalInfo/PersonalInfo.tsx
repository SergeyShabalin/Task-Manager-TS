import React, { useState } from 'react'
import classes from './PersonalInfo.module.css'
import { Button, Input } from '@UI'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'

export default function PersonalInfo() {
	const { _id ,firstName, secondName, lastName, email } = useTypedSelector(state => state.user)
	const {changeUser} = useActions()
	const [form, setForm] = useState({
		_id,
		secondName,
		firstName,
		lastName,
		email
	})

	function onSubmit(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		e.preventDefault()
		if (e.target) {
			setForm(prev => ({
				...prev,
				[e.target.name]: e.target.value
			}))
		}
	}

	function saveInfo(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault()
		changeUser(form)
	}

	return (
		<form className={classes.wrapper}>
			<header className={classes.title}>Информация о пользователе</header>
			<div className={classes.person_wrapper}>
				<div className={classes.control}>
					<span className={classes.placeholder}>Фамилия</span>
					<Input
						color={'blue'}
						autoComplete='off'
						variant='large'
						name='secondName'
						value={form.secondName}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Имя</span>
					<Input
						color={'blue'}
						autoComplete='off'
						variant='large'
						name='firstName'
						value={form.firstName}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Отчество</span>
					<Input
						color={'blue'}
						autoComplete='off'
						variant='large'
						name='lastName'
						value={form.lastName}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Email</span>
					<Input
						color={'blue'}
						autoComplete='off'
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
						variant='contained'
						onClick={e => saveInfo(e)}
					/>
				</div>
			</div>
		</form>
	)
}
