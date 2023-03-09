import React, { useRef, useState } from 'react'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import Done from '@/components/Features/Share/Done'
import classes from './Share.module.css'
import Control from '@/components/Features/Share/Control'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useParams } from 'react-router-dom'

interface ShareProps {
	onClose: () => void
}

export default function Share({ onClose }: ShareProps) {
	const shareRef = useRef(null)
	const [isShare, setIsShare] = useState(false)
	const { userId, boardId } = useParams()
	const users = useTypedSelector(state => state.board.allUsers)
	useOnClickOutside(shareRef, () => onClose())

	function changeShare(value: boolean) {
		setIsShare(value)
		setTimeout(() => setIsShare(false), 5000)
	}

	return (
		<div className={classes.wrapper} ref={shareRef}>
			<div className={classes.header}>Поделиться доской</div>
			<hr />
			{!isShare ? (
				<div>
					<Control userId={userId}  boardId={boardId}  changeShare={changeShare} />
					<span className={classes.user_span}>Текущие пользователи</span>
					<div className={classes.users}>
						<div className={classes.user_list}>
							{users?.map(user => {
								return (
									<div className={classes.user} key={user._id}>
										<div className={classes.avatar}>{user.email[0].toUpperCase()}</div>
										<div className={classes.user_info}>
											<div className={classes.email}>{user.email}</div>
											<div className={classes.name}>
												{user.secondName} {user.firstName}
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			) : (
				<Done />
			)}
		</div>
	)
}
