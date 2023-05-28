import React, { useState } from 'react'
import { BsBell } from 'react-icons/bs'

import { Button, Hint } from '@UI'
import useOpenClose from '@/hooks/UseOpenClose'
import MessageList from '@/components/Features/Header/Messages/MessageList'
import classes from './Messages.module.css'

interface MessagesProps {
	messagesCount: number
	userId?: string
}

export default function Messages({ messagesCount, userId }: MessagesProps) {
	const [isHint, setIsHint] = useState(false)
	const { isOpen, onClose, onOpen } = useOpenClose()

	function showHint() {
		setIsHint(true)
	}
	function closeHint() {
		setIsHint(false)
	}

	return (
		<div>
			<div className={classes.messages} onMouseOver={showHint} onMouseOut={closeHint}>
				<Button icon={<BsBell />} onClick={onOpen} />
				{!!messagesCount && (
					<span className={classes.count_messages} onClick={onOpen}>
						{messagesCount}
					</span>
				)}
				<Hint visible={isHint} label='Показать уведомления' />
			</div>
			{isOpen && <MessageList userId={userId} onClose={onClose} />}
		</div>
	)
}
