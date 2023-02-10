import React, { useRef } from 'react'
import classes from './MessageList.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { BsThreeDots } from 'react-icons/bs'

interface MessageListProps {
	onClose: () => void
}

export default function MessageList({ onClose }: MessageListProps) {

	const messageRef = useRef(null)
	useOnClickOutside(messageRef, () => onClose())
	const messages = useTypedSelector(state => state.user.messages)

	return (
		<div>
			<div className={classes.wrapper} ref={messageRef}>
				<span className={classes.title}>сообщения</span>
				<hr />
				{messages?.map(message => {
					return (
						<div className={classes.message}>
							<div className={classes.title_message}>{message}</div>
							<div><Button variant='just_icon' icon={<BsThreeDots />} /></div>
						</div>)
				})}
			</div>


		</div>
	)
}
