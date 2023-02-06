import React, { useRef } from 'react'
import { Dispatch } from 'redux'

import { Editor } from '@Features'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { BoardActions } from '@/store/board/reducer'
import classes from './ContextMenu.module.css'
import { RiDeleteBin5Line } from 'react-icons/all'
import { Link, useLocation, useNavigate } from 'react-router-dom'


interface ContextMenuProps {
	userId?: string
	boardId?: string
	cardId?: string
	contextClose?: () => void
	cardDelete?: () => void
}

export default function ContextMenu({ contextClose, cardDelete, userId, boardId, cardId }: ContextMenuProps) {

	const cxtRef = useRef(null)
	useOnClickOutside(cxtRef, contextClose)
	const location = useLocation()

	return (
		<div className={classes.contextWrapper} ref={cxtRef}>
				<ul className={classes.ul}>
					<li className={classes.li}>
						<RiDeleteBin5Line />
						<div className={classes.li_title} onClick={cardDelete}>Удалить карточку</div>
					</li>
					<Link
						className={classes.link}
						state={{ background: location }}
						to={`/user/${userId}/board/${boardId}/card/${cardId}`}
					>
					<li className={classes.li}>
						<RiDeleteBin5Line />
						<div className={classes.li_title} onClick={contextClose}>Открыть карточку</div>
					</li>
					</Link>
				</ul>
		</div>
	)
}

