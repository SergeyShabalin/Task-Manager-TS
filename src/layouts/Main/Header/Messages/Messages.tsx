import React, { useState } from 'react'
import { BsBell } from 'react-icons/bs'

import { Button, Hint } from '@UI'
import useOpenClose from '@/hooks/UseOpenClose'
import MessageList from '@/layouts/Main/Header/Messages/MessageList'
import classes from './Messages.module.css'

interface MessagesProps{
	messagesCount: number
}

export default function Messages({  messagesCount}: MessagesProps) {

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
				{messagesCount !== 0 && (
					<span className={classes.count_messages} onClick={onOpen}>
						{messagesCount}
					</span>
				)}
				<Hint visible={isHint} label='Показать уведомления' />
			</div>
			{isOpen && <MessageList onClose={onClose} />}
		</div>
	)
}
