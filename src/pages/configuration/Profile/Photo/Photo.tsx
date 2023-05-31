import React, { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AiOutlinePicture, MdAddAPhoto } from 'react-icons/all'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import ContextMenu from '@/pages/configuration/Profile/Photo/ContextMenu'
import classes from './Photo.module.css'

export default function Photo() {

	const { _id, avatar, firstName, secondName, background } = useTypedSelector(state => state.user)
	const inputAvatarRef = useRef<HTMLInputElement>(null)
	const location = useLocation()
	const urlAvatar = 'https://res.cloudinary.com/dwkxptye4/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1685513730/i_xigz5a.jpg?_s=public-apps'


	return (
		<div>
			<div className={classes.title_photo}>Фото профиля и изображение обложки</div>

			<div className={classes.wrapper_photo}>
				<div className={classes.background}>
					<Link state={{ background: location }} to={`/user/${_id}/configuration/backgroundEdit`}>
						{background && <img className={classes.background_img} src={background} />}
						<div className={classes.background_shadow}>
							{!background
								? <div>Загрузить фото</div>
								: <div className={classes.download_title}>Загрузить новое фото</div>
							}
							<span className={classes.download_logo}>
							<AiOutlinePicture />
						</span>
						</div>
					</Link>
				</div>


				<input hidden type={'file'} ref={inputAvatarRef} />
				<div className={classes.avatar}>
					{!avatar ? (
						<img
							className={classes.img}
							src={urlAvatar}
						/>
					) : (
						<img className={classes.img} src={avatar} />
					)}
					<div className={classes.frame_avatar}></div>
					<div className={classes.avatar_shadow}>
						<div className={classes.logo_avatar}>
							<MdAddAPhoto />
						</div>
						<ContextMenu userId={_id} />
					</div>
				</div>

				<div className={classes.white_background}>
					<div className={classes.person_name}>
						<h1 className={classes.second_name}>{secondName}</h1>
						<h1 className={classes.first_name}>{firstName}</h1>
					</div>
				</div>
			</div>
		</div>
	)
}
