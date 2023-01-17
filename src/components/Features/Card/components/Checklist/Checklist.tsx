import React, { useState } from 'react'
import classes from './CheckList.module.css'
import { Button, Checkbox } from '@UI'
import { MdClear } from 'react-icons/all'
import { CheckList } from '@/models/CheckList'
import { Editor } from '@Features'
import { useActions } from '@/hooks/useActions/useActions'


export default function Checklist({ done, _id, cardId, task }: CheckList) {

	const [isChecked, setChecked] = useState(done)
	const { changeTask } = useActions()

	function changeTaskDone({ target }: React.ChangeEvent<HTMLInputElement>) {
		const checked = target.checked
		setChecked(checked)
		const payload = { _id, done:target.checked, cardId }

		changeTask(payload)
	}

	function deleteTask() {

	}

	function changeTaskTitle(task: string) {
		const payload = { _id, task, cardId }
		changeTask(payload)

	}

	return (
		<div className={classes.checkbox}>
			<Checkbox checked={isChecked} onChange={changeTaskDone} />
			<div className={classes.checkbox_content}>
				<Editor
					buttonSubmitTitle='Сохранить'
					onSubmit={changeTaskTitle}
					placeholder='Введите название задачи'
				>
             <span
							 className={isChecked ? `${classes.checkbox_title_none}`
								 : `${classes.checkbox_title_done}`}>
                {task}
            </span>
				</Editor>
			</div>
			<div className={classes.delete_btn}>
				<div className={classes.delete_btn_wrapper}>
					{!isChecked &&
						<Button
							onClick={deleteTask}
							variant='just_icon'
							icon={<MdClear />}
						/>}
				</div>
			</div>
		</div>


	)
}

