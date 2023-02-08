import React, { useState } from 'react'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './BoardCreator.module.css'
import { useNavigate } from 'react-router-dom'
import BackgroundPicker from '@/pages/greeting/BoardCreator/BoardPicker'
import BoardColorPicker from '@/pages/greeting/BoardCreator/BoardColorPicker'
import { Button, Input } from '@UI'

export interface BoardCreatorProps {
	userId: string
}

export default function BoardCreator({ userId }: BoardCreatorProps) {
	const { addBoard } = useActions()
	const [mainBackground, setMainBackground] = useState('type1')
	const [titleBoard, setTitleBoard] = useState('')
	const navigate = useNavigate()
	const imagePicker = ['type1', 'type2', 'type3', 'type4']
	const colorPicker = ['black', 'gray', 'orange', 'blue', 'red', 'green']


	function changeBackground(type: string) {
		setMainBackground(type)
	}

	async function createBoard(title: string) {
		const payload = {
			userId,
			title
		}
		const boardId = await addBoard(payload)
		navigate(`/user/${userId}/board/${boardId}`)
		return boardId
	}

	function changeBoardTitle({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setTitleBoard(target.value)
	}

	return (
		<section className={classes.wrapper}>
			<div className={classes.header}>Создать доску</div>
			<hr />
			<div className={classes[mainBackground]}>
				<span className={classes.column_background_img}></span>
			</div>

			<div className={classes.pickers}>
				<span className={classes.title_picker}>фон</span>
				<div className={classes.background_picker}>
					<div className={classes.picker}>
						{imagePicker.map(picker => {
							return (
								<div key={picker} onClick={() => changeBackground(picker)}>
									<BackgroundPicker picker={picker} />
								</div>)
						})
						}
					</div>
					<div className={classes.background_color_picker}>
						{colorPicker.map(picker => {
							return (
								<div key={picker} onClick={() => changeBackground(picker)}>
									<BoardColorPicker picker={picker} />
								</div>
							)
						})
						}
					</div>
				</div>
			</div>
			<div className={classes.title_board_controller}>
				<span>Заголовок доски</span>
				<Input
					autoFocus
					color='outlined'
					placeholder='Введите название'
					value={titleBoard}
					onChange={changeBoardTitle} />
				<span>👋 Укажите название доски.</span>
			</div>

			<div className={classes.add_controller}>
				<div className={classes.add_btn}>
					<Button title='Создать' variant='outlined'  color={titleBoard ?'primary' : 'error'} disabled={!titleBoard}/>
				</div>
				<div className={classes.add_btn}>
					<Button title='Создать по шаблону' variant='outlined' color='primary'/>
				</div>
			</div>
		</section>
	)
}
