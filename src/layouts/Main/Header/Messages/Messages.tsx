import React, { useRef, useState } from 'react'
import classes from './Messages.module.css'
import { Button } from '@UI'
import { BsBell } from 'react-icons/bs'
import useOpenClose from '@/hooks/UseOpenClose'
import useOnClickOutside from '@/hooks/UseOnClickOutside'

export default function Messages() {
	const [isMessage, setIsMessage] = useState(true)
	const { isOpen, onClose, onOpen } = useOpenClose()
	const messageRef = useRef(null)
	useOnClickOutside(messageRef, ()=> onClose())

	return (
		<div>
			<div className={classes.messages}>
				<Button icon={<BsBell />} onClick={onOpen} />
				{isMessage && <span className={classes.count_messages} onClick={onOpen} >2</span>}
			</div>

			{isOpen && <div className={classes.messages_wrapper} ref = {messageRef}>
сообщения
			</div>}

		</div>
	)
}
