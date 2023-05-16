import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { RiDeleteBin5Line } from 'react-icons/ri'
import { MdOutlinePhotoCameraFront } from 'react-icons/all'
import classes from './ContextMenu.module.css'
import { useActions } from '@/hooks/useActions/useActions'

export interface ContextMenuProps{
	userId: string
}

export default function ContextMenu({userId}: ContextMenuProps) {

	const location = useLocation()
	const { changeUser } = useActions()

	function deletePhoto() {
		const payload = {
			_id: userId,
			avatar: ''
		}
		changeUser(payload)
	}

	return (
		<div className={classes.context_wrapper}>
			<ul className={classes.ul}>

				<Link
					className={classes.link}
					state={{ background: location }}
					to={`/user/${userId}/configuration/avatarEdit`}
				>
					<div className={classes.li}>
						<MdOutlinePhotoCameraFront />
						<div className={classes.li_title}>Изменить фото</div>
					</div>
				</Link>
				<div className={classes.li} onClick={deletePhoto}>
					<RiDeleteBin5Line />
					<div className={classes.li_title}  >
						Удалить фото
					</div>
				</div>
			</ul>
		</div>
	)

}
