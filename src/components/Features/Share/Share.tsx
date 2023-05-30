import React, { useRef, useState } from 'react'
import { BiChevronsDown } from 'react-icons/all'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import Control from '@/components/Features/Share/Control'
import CurrentUsers from '@/components/Features/Share/CurrentUsers'

import classes from './Share.module.css'

import { Button } from '@UI'

interface ShareProps {
	onClose: () => void
	boardId: string
}

export default function Share({ onClose, boardId }: ShareProps) {
	const shareRef = useRef(null)
	const [isOpenUsers, setIsOpenUsers] = useState(false)
	useOnClickOutside(shareRef, () => onClose())

	function showUsers() {
		setIsOpenUsers(!isOpenUsers)
	}

	return (
		<div className={classes.wrapper} ref={shareRef}>
			<div className={classes.header}>Поделиться доской</div>
			<hr />
			<div>
				<Control boardId={boardId} />
				<div className={classes.current_users}>
					<span className={classes.user_span}>Текущие пользователи</span>
					<Button endIcon={<BiChevronsDown />} color={'primary'} onClick={showUsers} />
				</div>
				{isOpenUsers && <CurrentUsers boardId={boardId} />}
			</div>
		</div>
	)
}
