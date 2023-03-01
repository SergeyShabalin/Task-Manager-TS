import React, { useEffect, useRef, useState } from 'react'
import classes from './Messages.module.css'
import { Button, Hint } from '@UI'
import { BsBell } from 'react-icons/bs'
import useOpenClose from '@/hooks/UseOpenClose'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import MessageList from '@/layouts/Main/Header/Messages/MessageList'

export default function Messages() {
	const [isMessage, setIsMessage] = useState(0)
	const [isHint, setIsHint] = useState(false)
	const { isOpen, onClose, onOpen } = useOpenClose()

	function showHint() {
		setIsHint(true)
	}
	function closeHint() {
		setIsHint(false)
	}

	const messagesCount = useTypedSelector(state => state.user.messages.length)

	useEffect(() => {
		if (messagesCount) setIsMessage(messagesCount)
	}, [messagesCount])

	return (
		<div>
			<div className={classes.messages} onMouseOver={showHint} onMouseOut={closeHint}>
				<Button icon={<BsBell />} onClick={onOpen} />
				{isMessage !== 0 && (
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
