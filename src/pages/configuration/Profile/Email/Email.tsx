import React, { useState } from 'react'
import classes from './Email.module.css'
import { Button, Input } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

export default function Email() {

	const _id = useTypedSelector(state => state.user._id)
	const initState = {_id, email: ''}
	const [form, setForm] = useState(initState)

	const { changePersonalInfo } = useActions()

	function saveEmail(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault()
		const confirm = window.confirm('Изменить email?')
		if(confirm){
			changePersonalInfo(form)
			setForm(initState)
		}
	}

	function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {

		if (!e.target) return
		setForm(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	return (
		<form onSubmit={saveEmail}>
			<span className={classes.title_email}>Изменение электронной почты</span>
			<div className={classes.wrapper}>
				<div className={classes.control}>
				<span className={classes.placeholder}>Введите новый email</span>

				<Input
					color='blue'
					variant='large'
					name='email'
					value={form.email}
					onChange={changeEmail}
				/>
				</div>
				<div className={classes.btn_wrapper}>
				{form.email &&	<Button title='Сохранить' color='primary' type='submit' variant='contained' />}
				</div>
			</div>
		</form>
	)
}
