import React, { FormEvent, useRef, useState } from 'react'
import classes from './AddChecklist.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { Button, Input } from '@UI'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useParams } from 'react-router-dom'

interface AddChecklistProps {
	closeChecklist: () => void
}

export default function AddChecklist({ closeChecklist }: AddChecklistProps) {

	const AddChecklistsRef = useRef<HTMLDivElement | null>(null)
	useOnClickOutside(AddChecklistsRef, () => closeChecklist())

	const [taskValue, setTaskValue] = useState({})
	const socket = useTypedSelector(state => state.user.socket)
	const { cardId } = useParams()

	function applySearch(e: React.ChangeEvent<HTMLInputElement>) {
		setTaskValue(e.target.value)
	}

	function submitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (cardId) {
			const payload = {
				cardId,
				task: taskValue
			}
			if (socket?.emit('TASK_ADD', payload)) {
				closeChecklist()
				return true
			}
		}
	}

	return (
		<div className={classes.wrapper} ref={AddChecklistsRef}>
			<h1>Новый чеклист</h1>
			<hr />
			<form className={classes.wrapper_control} onSubmit={submitForm}>
				<Input placeholder='добавьте задачу' color='blue' onChange={applySearch} />
				<div className={classes.btn}>
					<Button title='Создать' variant='contained' color='primary' />
				</div>
			</form>
		</div>
	)
}
