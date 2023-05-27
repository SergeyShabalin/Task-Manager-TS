import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { RiTrelloFill } from 'react-icons/ri'
import { Button } from '@UI'
import { MdKeyboardArrowDown } from 'react-icons/md'

import Share from '@/components/Features/Share'
import Account from '@/layouts/Main/Header/Account'
import Messages from '@/layouts/Main/Header/Messages'
import Logout from '@/layouts/Main/Header/Logout'

import { useActions } from '@/hooks/useActions/useActions'
import useOpenClose from '@/hooks/UseOpenClose'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

import classes from './Header.module.css'

interface HeaderProps {
	userId: string
}

export default function Header({ userId }: HeaderProps) {

	const navigate = useNavigate(),
		{ boardId } = useParams(),
		{ backToGreeting } = useActions(),
		{ isOpen, onClose, onOpen } = useOpenClose(),
		location = useLocation(),
		messagesCount = useTypedSelector(state => state.user.messages?.length),
		socket = useTypedSelector(({ user }) => user.socket),
		[isShow, setIsShow] = useState(false),
		[color, setColor] = useState('type1'),
		isShare = location.pathname.includes('board')

	useEffect(()=>{
		getRandomColor()
	},[location])

	useEffect(() => {
		if (userId) {
			setIsShow(true)
		} else {
			setIsShow(false)
		}
	}, [userId])


	function backInGreeting() {
		if (userId) navigate(`/user/${userId}/greeting`)
		if (boardId) {
			backToGreeting(boardId)
			if (socket) socket.emit('LEAVE_BOARD', boardId)
		}
	}


	function getRandomColor() {
		const strings = [
			'type1',
			'type2',
			'type3',
			'type4',
			'type5',
			'type6',
			'type7',
			'type8'
		];

		const randomIndex = Math.floor(Math.random() * strings.length);
		const randomColor = strings[randomIndex];

		setColor(randomColor)
	}


	return (
		<>
			{isShow &&
				<div className={classes[color]}>
					<div className={classes.logo} onClick={backInGreeting}>
				<span className={classes.icon}>
					<RiTrelloFill />
				</span>
						<span>TASK MANAGER</span>
					</div>
					{isShare && (
						<div className={classes.share}>
							<Button title='Поделиться' endIcon={<MdKeyboardArrowDown />} onClick={onOpen} />
							{isOpen && <Share onClose={onClose} />}
						</div>
					)}

					<div className={classes.control}>
						<Account  />
						<Messages messagesCount={messagesCount} />
						<Logout boardId={boardId} userId={userId} />
					</div>
				</div>
			}
		</>

	)
}
