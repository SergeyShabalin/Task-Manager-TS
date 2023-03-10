import React from 'react'
import { IoWarningOutline } from 'react-icons/all'
import { render } from 'react-dom'

import classes from './Notifications.module.css'

interface NotificationsTypes {
	message: string
}

function Notifications({ message }: NotificationsTypes) {
	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<IoWarningOutline />
				<span className={classes.title}>Произошла ошибка!</span>
			</div>
			<div className={classes.footer}>
				<span className={classes.message}>{message}</span>
			</div>
		</div>
	)
}

export default class Notification {
	static error(message: string) {
		const time = 4000
		const id = 'Notification' + new Date().getTime()
		const node = document.getElementById('notification')
		const root = document.createElement('div')
		root.id = id
		if (node !== null) {
			node.appendChild(root)
			setTimeout(() => {
				node.removeChild(root)
			}, time)
		}
		render(<Notifications message={message} />, root)
	}
}
