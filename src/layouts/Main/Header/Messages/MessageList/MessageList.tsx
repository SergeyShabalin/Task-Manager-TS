import React, { useEffect, useRef, useState } from 'react'
import classes from './MessageList.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'

import { useActions } from '@/hooks/useActions/useActions'
import { useParams } from 'react-router-dom'
import { GiNightSleep, TbMessageCircle, TbMessages } from 'react-icons/all'

interface MessageListProps {
	onClose: () => void
}

export default function MessageList({ onClose }: MessageListProps) {
	const messageRef = useRef(null)
	useOnClickOutside(messageRef, () => onClose())
	const { userId } = useParams()
	const messages = useTypedSelector(state => state.user.messages)
	const { applyInvite, deleteMessage } = useActions()
	const [isMessage, setIsMessage] = useState(false)

	useEffect(() => {
		if (messages.length < 1) setIsMessage(true)
	}, [])

	function messageDelete(boardId: string) {
		const payload = {
			userId,
			boardId
		}
		deleteMessage(payload)
	}

	function inviteApply(boardId: string) {
		const payload = {
			userId,
			boardId
		}
		applyInvite(payload)
		deleteMessage(payload)
	}

	return (
		<div>
			<div className={classes.wrapper} ref={messageRef}>
				<span className={classes.title}>Cообщения</span>
				<hr />
				{isMessage && <div className={classes.empty}>
				<span className={classes.title_empty}>У вас нет непрочитанных сообщений</span>
					 <div className={classes.img}></div>
				</div>}
				{messages?.map(message => {
					return (
						<div key={Math.random()} className={classes.message}>
							<div className={classes.title_message}>{message.message}</div>
							<div className={classes.control}>
								<Button
									title='Да'
									variant='outlined'
									color='primary'
									onClick={() => inviteApply(message.currentBoardId)}
								/>
								<Button
									title='Нет'
									variant='outlined'
									color='error'
									onClick={() => messageDelete(message.currentBoardId)}
								/>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
