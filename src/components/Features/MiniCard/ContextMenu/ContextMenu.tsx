import React, { useRef } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiFillFolderOpen } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import classes from './ContextMenu.module.css'

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
					<Link
						className={classes.link}
						state={{ background: location }}
						to={`/user/${userId}/board/${boardId}/card/${cardId}`}
					>
					<li className={classes.li}>
						<AiFillFolderOpen />
						<div className={classes.li_title}>Открыть карточку</div>
					</li>
					</Link>
						<li className={classes.li}>
						<RiDeleteBin5Line />
						<div className={classes.li_title} onClick={cardDelete}>Удалить карточку</div>
					</li>
				</ul>
		</div>
	)
}

