import React from 'react'
import { BsCheck2Square, IoWarningOutline } from 'react-icons/all'
import { render } from 'react-dom'

import classes from './Notifications.module.css'

interface NotificationsTypes {
	message: string
	type?: 'submit' | 'error' | 'warning'
}

function Notifications({ message, type = 'error' }: NotificationsTypes) {
	return (
		<div className={classes.wrapper}>
			{type === 'submit' && (
				<div className={classes.header_submit}>
					<BsCheck2Square />
					<span className={classes.title}>Действие выполнено!</span>
				</div>
			)}
			{type === 'error' && (
				<div className={classes.header_error}>
					<IoWarningOutline />
					<span className={classes.title}>Произошла ошибка!</span>
				</div>
			)}
			{type === 'warning' && (
				<div className={classes.header_warning}>
					<IoWarningOutline />
					<span className={classes.title}>Внимание!</span>
				</div>
			)}
			<div className={classes.footer}>
				<span className={classes.message}>{message}</span>
			</div>
		</div>
	)
}

export default class Notification {
	static error(message: string, type?: 'submit' | 'error' | 'warning') {
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
		render(<Notifications message={message} type={type} />, root)
	}
}
