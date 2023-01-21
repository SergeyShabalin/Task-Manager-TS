import React from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Button, Slider } from '@UI'
import { Editor } from '@Features'
import { Card } from '@/models/Cards'
import { useActions } from '@/hooks/useActions/useActions'
import Task from '@/components/Features/Card/components/Checklist/Task'

import classes from './CheckList.module.css'

type ChecklistProps = Pick<Card, 'doneTask' | 'countTask' | 'checkList' | '_id'>

export default function Checklist({ doneTask, countTask, _id, checkList }: ChecklistProps) {
	const { addNewTask } = useActions()

	function addTask(value: string) {
		if (_id) return addNewTask(_id, value)
	}

	return (
		<>
			<div className={classes.checklist_title_wrapper}>
				<FiCheckSquare className={classes.icons} />
				<h4>Чек-лист</h4>
			</div>

				<Slider doneTask={doneTask} countTask={countTask} />

			{checkList.map(checkItem => (
				<Task key={checkItem._id} {...checkItem} />
			))}
			<Editor
				buttonSubmitTitle='Добавить задачу'
				onSubmit={addTask}
				placeholder='Введите название задачи'
			>
				<Button variant='outlined' title='Добавить карточку' />
			</Editor>
		</>
	)
}
