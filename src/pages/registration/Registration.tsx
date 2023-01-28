import React, { useState } from 'react'
import { Button, Input } from '@UI'
import classes from './Registration.module.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useActions } from '@/hooks/useActions/useActions'

export default function Registration() {
	const { registration } = useActions()

	function startRegistration() {}

	const [form, setForm] = useState({
		email: '',
		password: '',
		boardIds: [],
		firstName: '',
		secondName: '',
		lastName: '',
		birthday: new Date()
	})

	function onChange(e) {
		if (e.target) {
			setForm(prev => ({
				...prev,
				[e.target.name]: e.target.value
			}))
		} else
			setForm(prev => ({
				...prev,
				[e.name]: e.value
			}))
	}

	return (
		<form className={classes.wrapper}>
			<div className={classes.controller}>
				<Input placeholder='email' onChange={onChange} name='email' />
				<Input placeholder='пароль' onChange={onChange} name='password' />
				<Input placeholder='фамилия' onChange={onChange} name='secondName' />
				<Input placeholder='имя' onChange={onChange} name='firstName' />
				<Input placeholder='отчество' onChange={onChange} name='lastName' />
				<DatePicker  name = 'birthday' selected={startDate} onChange={onChange} placeholderText='Дата рождения' />
				<Button
					onClick={startRegistration}
					title='Регистрация'
					variant='contained'
					color='primary'
				/>
			</div>
		</form>
	)
}
