import React from 'react'
import { MdClear } from 'react-icons/md'

import { Button, Checkbox } from '@UI'
import { CheckList } from '@/models/CheckList'
import { Editor } from '@Features'

import classes from './CheckList.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'


export default function Task({ done, _id, cardId, task }: CheckList) {
	const socket = useTypedSelector(state => state.user.socket)

	const classNameForTask = done ? classes.checkbox_title_none : classes.checkbox_title_done

	function changeTaskDone({ target }: React.ChangeEvent<HTMLInputElement>) {
		const done = target.checked
		const payload = { _id, done, cardId }
		socket?.emit('TASK_CHANGE', payload)
	}

	function taskDelete() {
		socket?.emit('TASK_DELETE', {cardId, taskId:_id})
	}

	function changeTaskTitle(task: string) {
		const payload = { _id, task, cardId }
		if(	socket?.emit('TASK_CHANGE', payload)) return true
	}

	return (
		<div className={classes.checkbox}>
			<Checkbox checked={done} onChange={changeTaskDone} />
			<div className={classes.checkbox_content}>
				<Editor
					buttonSubmitTitle='Сохранить'
					onSubmit={changeTaskTitle}
					placeholder='Введите название задачи'
					defaultValue={task}
					rows={1}
					color='outlined'
				>
					<span className={classNameForTask}>
						{task}
					</span>
				</Editor>
			</div>
			<div className={classes.delete_btn}>
					{!done && <Button onClick={taskDelete} variant='just_icon' icon={<MdClear />} />}
			</div>
		</div>
	)
}
