import React from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import { RiTrelloFill } from 'react-icons/ri'

import classes from './Header.module.css'
import { Button } from '@UI'
import { Editor } from '@/components/Features'
import { useActions } from '@/hooks/useActions/useActions'
import { useNavigate } from 'react-router-dom'

export default function Header() {

	const {addBoard} = useActions()
	const navigate = useNavigate()

 async 	function createBoard(title: string) {
		const boardId = await addBoard(title)
		navigate(`/board/${boardId}`)
		return boardId
	}

	return (
		<div className={classes.header}>
			<div className={classes.menu}>
				<Button variant='just_icon' icon={<CgMenuGridO />} />
			</div>
			<Editor buttonSubmitTitle='Добавить доску' onSubmit={createBoard}>
				<Button variant='text' title='Новая доска'/>
			</Editor>
			<div className={classes.logo}>
				<span className={classes.icon}>

					<RiTrelloFill />
				</span>
				<span>TASK MANAGER</span>
			</div>
		</div>
	)
}
