import React, { useState } from 'react'
import classes from './CheckList.module.css'
import { Button, Checkbox } from '@UI'
import { MdClear } from 'react-icons/all'
import { CheckList } from '@/models/CheckList'


export default function Checklist({done, _id, cardId, task }: CheckList){

	const [isChecked, setChecked] = useState(done);

	function changeTaskDone({ target }: React.ChangeEvent<HTMLInputElement>) {
		const checked = target.checked;
		setChecked(checked);
		// dispatch(updateTaskValue(checked, _id, cardId, columnId));
	}

	function deleteTask(){

	}

	return (
		<div className={classes.checkbox} >
			<Checkbox checked={isChecked} onChange={changeTaskDone}  />
			<div className={classes.checkbox_content}>
             <span
							 className={isChecked ? `${classes.checkbox_title_none}`
								 : `${classes.checkbox_title_done}`}>
                {task}
            </span>
			</div>
			<div className={classes.delete_btn}>
				<div className={classes.delete_btn_wrapper}>
					{!isChecked &&
						<Button
							onClick={deleteTask}
							variant="just_icon"
							icon={<MdClear />}
						/>}
				</div>
			</div>
		</div>
	)
}

