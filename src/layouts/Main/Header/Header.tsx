import React from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import { RiTrelloFill } from 'react-icons/ri'
import { MdLogout } from 'react-icons/md'

import classes from './Header.module.css'
import { Button } from '@UI'
import { Editor } from '@/components/Features'
import { useActions } from '@/hooks/useActions/useActions'
import { useNavigate } from 'react-router-dom'

import { User } from '@/models/Users'

export default function Header({ _id }: Partial<User>, ) {
	const { addBoard, logOut } = useActions()
	const navigate = useNavigate()

	async function createBoard(title: string) {
		const payload = {
			userId: _id,
			title,
			background
		}
		const boardId = await addBoard(payload)
		navigate(`/user/${_id}/board/${boardId}`)
		return boardId
	}

	function logout() {
		logOut()
		navigate(`/login`)
	}

	function backToGreeting() {
		if (_id)	navigate(`/user/${_id}/greeting`)
	}

	return (
		<div className={classes.header}>
			<div className={classes.menu}>
				<Button variant='just_icon' icon={<CgMenuGridO />} onClick={backToGreeting} />
			</div>
			{/*<Editor buttonSubmitTitle='Добавить доску' onSubmit={createBoard}>*/}
			{/*	<Button variant='text' title='Новая доска' />*/}
			{/*</Editor>*/}
			<div className={classes.logo}>
				<span className={classes.icon}>
					<RiTrelloFill />
				</span>
				<span>TASK MANAGER</span>
			</div>
			<div className={classes.logout}>
				<Button icon={<MdLogout />} onClick={logout} />
			</div>
		</div>
	)
}
