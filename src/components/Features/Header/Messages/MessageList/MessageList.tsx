import React, { useRef } from 'react'


import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './MessageList.module.css'

interface MessageListProps {
	onClose: () => void
	userId?: string
}

export default function MessageList({ onClose, userId }: MessageListProps) {
	const messageRef = useRef(null)
	const messages = useTypedSelector(state => state.user.messages)
	useOnClickOutside(messageRef, () => onClose())

	const { applyInvite, deleteMessage } = useActions()
	const isMessage = messages.length < 1

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
