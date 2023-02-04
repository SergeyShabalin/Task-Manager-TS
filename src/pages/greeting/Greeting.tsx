import React, { useEffect } from 'react'
import classes from './Greeting.module.css'
import Header from '@/layouts/Main/Header'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useActions } from '@/hooks/useActions/useActions'
import { useNavigate } from 'react-router-dom'
import "./Colors.css";

export default function Greeting() {
	const user = useTypedSelector(state => state.user)
	const allBoards = useTypedSelector(state => state.board.allBoards)
	const navigate = useNavigate()

	const { getAllBoard } = useActions()

	useEffect(() => {
		getAllBoard(user._id)
	}, [user])

	function openBoard(boardId: string) {
		navigate(`/user/${user._id}/board/${boardId}`)
	}

	function getRandomInt(max: number) {
		return Math.floor(Math.random() * max);
	}

	const colorsIcon = [
		"iconRed",
		"iconBlue",
		"iconGreen",
		"iconYellow",
		"iconMagenta",
		"iconDark",
		"iconGrBl",
		"iconOrange",
		'WitchingHour',
		'KieMeh'
	];

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<Header />
			</div>
			<div className={classes.body}>
				<div className={classes.content}>
					<span className={classes.title_workspaces}>ВАШИ РАБОЧИЕ ПРОСТРАНСТВА</span>
					<div className={classes.workspaces}>
						{allBoards.map(board => {
							const color = getRandomInt(10);
							return (
								<div key={board._id}  className={colorsIcon[color]}  onClick={() => openBoard(board._id)}>
									{board.title}
								</div>
							)
						})}
						<div className={classes.board_creator}>Создать доску</div>
					</div>
				</div>
			</div>
		</div>
	)
}
