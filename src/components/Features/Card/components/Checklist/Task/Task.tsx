import React, { useState } from 'react'
import { MdClear } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'

import { Button, Checkbox, Hint, Notification } from '@UI'
import { CheckList } from '@/models/CheckList'
import { Editor } from '@Features'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import classes from '../CheckList.module.css'
import { BiIdCard } from 'react-icons/all'

export default function Task({ done, _id, cardId, task }: CheckList) {
	const socket = useTypedSelector(state => state.user.socket)
	const classNameForTask = done ? classes.checkbox_title_none : classes.checkbox_title_done

	const [isHint, setIsHint] = useState(false)
	const [hintName, setHintName] = useState('ss')
	const [coordinates, setCoordinates] = useState({ left: 0, top: 0 })

	function changeTaskDone({ target }: React.ChangeEvent<HTMLInputElement>) {
		const done = target.checked
		const payload = { _id, done, cardId }
		socket?.emit('TASK_CHANGE', payload)
	}

	function taskDelete() {
		socket?.emit('TASK_DELETE', { cardId, taskId: _id })
	}

	function changeTaskTitle(task: string) {
		const payload = { _id, task, cardId }
		if (socket?.emit('TASK_CHANGE', payload)) return true
	}

	function convertToCard() {
		if (socket?.emit('CONVERT_TASK_TO_CARD', { title: task, cardId })) {
			socket?.emit('TASK_DELETE', { cardId, taskId: _id })
		}
	}

	function showHint(e: any) {
		e.stopPropagation()
		setHintName(e.target.name)
		setIsHint(true)
		const rect = e.currentTarget.getBoundingClientRect()
		setCoordinates(rect)
	}

	function closeHint() {
		setIsHint(false)
	}

	return (
		<div className={classes.checkbox} onMouseLeave={closeHint}>
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
					<span className={classNameForTask}>{task}</span>
				</Editor>
			</div>
			<div className={classes.delete_btn}>
				{!done && (
					<div className={classes.btn_wrapper} >
						<Button
							name={'Преобразовать в карточку'}
							onMouseEnter={showHint}
							variant='just_icon'
							icon={<BiIdCard />}
							onClick={convertToCard}
						/>

						<Button
							name={'Удалить задачу'}
							onMouseEnter={showHint}
							onClick={taskDelete}
							variant='just_icon'
							icon={<MdClear />}
						/>

						{isHint && (
							<div
								className={classes.hint}
								style={{
									position: 'fixed',
									left: coordinates.left + 15,
									top: coordinates.top - 15,
									zIndex: '5'
								}}
							>
								<Hint label={hintName} visible={isHint} />
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
