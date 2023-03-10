import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './MessageList.module.css'

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
	}, [messages])

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
				<h1>Cообщения</h1>

				{isMessage && (
					<span className={classes.title_empty}>У вас нет непрочитанных сообщений</span>
				)}
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
