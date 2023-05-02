import React from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Button, Slider } from '@UI'
import { Editor } from '@Features'
import { Card } from '@/models/Cards'
import { useActions } from '@/hooks/useActions/useActions'
import Task from '@/components/Features/Card/components/Checklist/Task'

import classes from './CheckList.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

type ChecklistProps = Pick<Card, 'doneTask' | 'countTask' | 'checkList' | '_id'>

export default function Checklist({ doneTask, countTask, _id, checkList }: ChecklistProps) {
	const socket = useTypedSelector(state => state.user.socket)

	function addTask(value: string) {

		if (_id) {
			const payload = {
				cardId: _id,
				task: value
			}
			if (socket?.emit('TASK_ADD', payload)) return true
		}
	}

	return (
		<>
			<div className={classes.checklist_title_wrapper}>
				<FiCheckSquare className={classes.icons} />
				<h4>Чек-лист</h4>
			</div>

			<div className={classes.slider}>
				<Slider doneTask={doneTask} countTask={countTask} />
			</div>
			<div className={classes.checklist}>
				{checkList.map(checkItem => (
					<Task key={checkItem._id} {...checkItem} />
				))}
			</div>
			<Editor
				buttonSubmitTitle='Добавить задачу'
				onSubmit={addTask}
				placeholder='Введите название задачи'
				rows={1}
				color='outlined'
			>
				<Button variant='outlined' title='Добавить задачу' />
			</Editor>
		</>
	)
}
