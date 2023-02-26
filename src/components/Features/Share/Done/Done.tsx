import React from 'react'
import classes from './Done.module.css'

export default function Done() {
	return (
		<div className={classes.share_done}>
			<span className={classes.done}>Приглашение отправлено</span>
			<span className={classes.hint}>
				Пользователь появится в списке текущих пользователей сразу после того, как примет
				приглашение
			</span>
		</div>
	)
}
