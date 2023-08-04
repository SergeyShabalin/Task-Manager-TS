import React, { useState } from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import { BiShowAlt, BiHide } from 'react-icons/bi'

import { Button, Slider } from '@UI'
import { Editor } from '@Features'
import { Card } from '@/models/Cards'
import { useActions } from '@/hooks/useActions/useActions'
import Task from '@/components/Features/Card/components/Checklist/Task'

import classes from './CheckList.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActionsToolkit } from '@/hooks/useActions/toolkit/useActions'



type ChecklistProps = Pick<Card, 'doneTask' | 'countTask' | 'checkList' | '_id'>



export default function Checklist({ doneTask, countTask, _id, checkList }: ChecklistProps ) {
	// const socket = useTypedSelector(state => state.user.socket)
	// const checklist = useTypedSelector(state => state.board.cardInfo.checkList)
	const { openShowDoneTasks } = useActions()
	const { addNewTask } = useActionsToolkit()
	const [isShowDone, setIsShowDone] = useState(true)


	function addTask(value: string) {
		if (_id) {
			const payload = {
				cardId: _id,
				task: value
			}
		return 	addNewTask(payload)
		}
	}

	function hideDoneChecklist() {
		// openShowDoneTasks(!isShowDone, checklist)
		// setIsShowDone(!isShowDone)
	}

	return (
		<>
			<div className={classes.checklist_title_wrapper}>
				<FiCheckSquare className={classes.icons} />
				<h4>Чек-лист</h4>
				<div className={classes.btn_hide}>

					<Button
						startIcon={!isShowDone
							? <BiShowAlt className={classes.icon} />
							: <BiHide className={classes.icon} />}
						onClick={hideDoneChecklist}
						variant='full_contain'
						title={isShowDone ? 'Скрыть выполненные' : 'показать выполненные'}
					/>
				</div>
			</div>

			<div className={classes.slider}>
				<Slider doneTask={doneTask} countTask={countTask} />
			</div>
			<div className={classes.checklist}>
				{checkList.map(checkItem => (
					<Task key={checkItem._id}  {...checkItem} />
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
