import React, { FormEvent, useRef, useState } from 'react'
import classes from './AddChecklist.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { Button, Input } from '@UI'
import { useParams } from 'react-router-dom'
import { useActionsToolkit } from '@/hooks/useActions/toolkit/useActions'

interface AddChecklistProps {
	closeChecklist: () => void
}

export default function AddChecklist({ closeChecklist }: AddChecklistProps) {

	const AddChecklistsRef = useRef<HTMLDivElement | null>(null)
	useOnClickOutside(AddChecklistsRef, () => closeChecklist())

	const [taskValue, setTaskValue] = useState('')
	const { addNewTask } = useActionsToolkit()

	const { cardId } = useParams()

	function applySearch(e: React.ChangeEvent<HTMLInputElement>) {
		setTaskValue(e.target.value)
	}

	async function submitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (cardId) {
			const payload = {
				cardId,
				task: taskValue
			}
			if (await addNewTask(payload)) closeChecklist()
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
