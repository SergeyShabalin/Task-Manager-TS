import React, { useState } from 'react'
import { Button, Input } from '@UI'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'

import classes from './PersonalInfo.module.css'

export default function PersonalInfo() {
	const { secondName, lastName, firstName, _id, organization, department, position } = useTypedSelector(state => state.user)
	const { changeUser } = useActions()
	const [form, setForm] = useState({
		secondName,
		lastName,
		firstName,
		_id,
		organization,
		department,
		position,
	})

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
					<span className={classes.placeholder}>Организация</span>
					<Input
						color='blue'
						variant='large'
						name='organization'
						value={form.organization}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Отдел</span>
					<Input
						color='blue'
						variant='large'
						name='department'
						value={form.department}
						onChange={onSubmit}
					/>
					<span className={classes.placeholder}>Должность</span>
					<Input
						color='blue'
						variant='large'
						name='position'
						value={form.position}
						onChange={onSubmit}
					/>

				</div>

				<div className={classes.btn_wrapper}>
					<Button
						title='Сохранить'
						color='primary'
						variant='contained'
						 type='submit'
					/>
				</div>
			</div>
		</form>
	)
}
