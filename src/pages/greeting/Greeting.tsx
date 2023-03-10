import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Header from '@/layouts/Main/Header'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import BoardCreator from '@/components/Features/BoardCreator'
import useOpenClose from '@/hooks/UseOpenClose'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import MiniBoard from '@/pages/greeting/MiniBoard'
import classes from './Greeting.module.css'
import { Loader } from '@UI'

export default function Greeting() {

	const allBoards = useTypedSelector(state => state.board.allBoards)
	const user = useTypedSelector(state => state.user)
	const isLoading = useTypedSelector(state => state.board.isLoading)

	const navigate = useNavigate()
	const { userId } = useParams()
	const addBoardRef = useRef(null)
	const { getAllBoard } = useActions()
	const { onOpen, onClose, isOpen } = useOpenClose()
	useOnClickOutside(addBoardRef, onClose)

	useEffect(() => {
		if (userId) getAllBoard(userId)
	}, [])

	function openBoard(boardId: string) {
		navigate(`/user/${userId}/board/${boardId}`)
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<Header email={user.email}  />
			</div>
			<div className={classes.body}>
				<div className={classes.content}>
					<span className={classes.title_workspaces}>ВАШИ РАБОЧИЕ ПРОСТРАНСТВА</span>
					<div className={classes.workspaces}>
						{allBoards.map(board => {
							return (
								<MiniBoard key={board._id} board={board} openBoard={openBoard} userId={userId!}/>
							)})}
						<div className={classes.board_creator} onClick={onOpen}>Создать доску</div>
					</div>
				</div>

			</div>
			<div ref={addBoardRef}>
				{isOpen && <BoardCreator userId={userId!} />}
			</div>
			{isLoading &&	<Loader size={'large'}/> }
		</div>
	)
}
