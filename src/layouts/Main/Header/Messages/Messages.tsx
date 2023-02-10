import React, { useEffect, useRef, useState } from 'react'
import classes from './Messages.module.css'
import { Button } from '@UI'
import { BsBell } from 'react-icons/bs'
import useOpenClose from '@/hooks/UseOpenClose'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import MessageList from '@/layouts/Main/Header/Messages/MessageList'

export default function Messages() {
	const [isMessage, setIsMessage] = useState(false)
	const { isOpen, onClose, onOpen } = useOpenClose()


	const messagesCount = useTypedSelector(state => state.user.messages.length)
	const messagesCount2 = useTypedSelector(state => state.user)
	// console.log({ messagesCount2 })
	useEffect(() => {
		if (messagesCount) setIsMessage(messagesCount)
	}, [])

	return (
		<div>
			<div className={classes.messages}>
				<Button icon={<BsBell />} onClick={onOpen} />
				{isMessage && <span className={classes.count_messages} onClick={onOpen}>{messagesCount}</span>}
				<span className={classes.hint}>Посмотреть сообщения</span>
			</div>

			{isOpen && <MessageList onClose={onClose}/>

			 }
			{/*//TODO в отдельный компонент сообщения и подгружать их отдельно*/}

		</div>
	)
}
