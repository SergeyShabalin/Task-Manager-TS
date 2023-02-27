import React, { useRef } from 'react'
import classes from './MessageList.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'

import { useActions } from '@/hooks/useActions/useActions'
import { useParams } from 'react-router-dom'

interface MessageListProps {
	onClose: () => void
}

export default function MessageList({ onClose }: MessageListProps) {
	const messageRef = useRef(null)
	useOnClickOutside(messageRef, () => onClose())
	const { userId } = useParams()
	const messages = useTypedSelector(state => state.user.messages)
	const {applyInvite} = useActions()

	function deleteMessage(){

	}

	function inviteApply(boardId: string){
		const payload = {
			userId,
			boardId
		}
	 applyInvite(payload)
	}

	return (
		<div>
			<div className={classes.wrapper} ref={messageRef}>
				<span className={classes.title}>Cообщения</span>
				<hr />
				{messages?.map(message => {
					return (
						<div key={Math.random()} className={classes.message}>
							<div className={classes.title_message}>{message.message}</div>
							<div>
								<Button title='Да' variant='contained' color='primary' onClick={()=>inviteApply(message.currentBoardId)}/>
								<Button title='Нет' variant='contained' color='error' />
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
