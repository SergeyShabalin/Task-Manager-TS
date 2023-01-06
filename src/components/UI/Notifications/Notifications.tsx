import React, { useEffect, useMemo, useState } from 'react'
import classes from './Notifications.module.css'
import { IoWarningOutline } from 'react-icons/all'

//TODO появляется скролл справа, убрать

interface NotificationsTypes {
	open: boolean
	onClose?: () => void
	ref?: React.LegacyRef<HTMLDivElement>
	message: string
}

export default function Notifications({ open, onClose, ref, message }: NotificationsTypes) {
	const [view, setView] = useState(open)

	useEffect(() => {
		setView(open)
	}, [open])

	useEffect(() => {
		 	setTimeout(() => setView(false), 3000)
	}, [])

	if (!view) return null

	return (
			<div className={classes.wrapper}>
				<IoWarningOutline />
				<span className={classes.message}>{message}</span>
			</div>
	)
}
