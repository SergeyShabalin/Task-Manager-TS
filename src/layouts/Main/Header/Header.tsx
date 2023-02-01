import React from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import { RiTrelloFill } from 'react-icons/ri'
import { MdLogout } from 'react-icons/md'

import classes from './Header.module.css'
import { Button } from '@UI'
import { Editor } from '@/components/Features'
import { useActions } from '@/hooks/useActions/useActions'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { UserAC } from '@/store/user/action'

export default function Header({userId}: string) {
	const { addBoard } = useActions()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	async function createBoard(title: string) {
		const payload = {
			userId,
			title
		}
		const boardId = await addBoard(payload)
		navigate(`/board/${boardId}`)
		return boardId
	}

	function logout() {
		localStorage.removeItem('token')
		dispatch(UserAC.logout())
		navigate(`/login`)
	}

	return (
		<div className={classes.header}>
			<div className={classes.menu}>
				<Button variant='just_icon' icon={<CgMenuGridO />} />
			</div>
			<Editor buttonSubmitTitle='Добавить доску' onSubmit={createBoard}>
				<Button variant='text' title='Новая доска' />
			</Editor>
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
