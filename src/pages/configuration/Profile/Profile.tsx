import React from 'react'
import classes from './Profile.module.css'

export default function Profile() {
	return (
		<div className={classes.wrapper}>
			<h1>Настройки профиля</h1>
			<div className={classes.content}>
				<span>Фото профиля и изображение обложки</span>
				<div className={classes.wrapper_photo}>
					<div className={classes.background}></div>
					<div className={classes.avatar}></div>
					<div className={classes.white_background}></div>
				</div>
			</div>

		</div>
	)
}
