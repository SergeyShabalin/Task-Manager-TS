import React, { useRef, useState } from 'react'
import classes from './Photo.module.css'
import { AiOutlinePicture, MdAddAPhoto } from 'react-icons/all'
import { Link, useLocation } from 'react-router-dom'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import useOpenClose from '@/hooks/UseOpenClose'
import ContextMenu from '@/pages/configuration/Profile/Photo/ContextMenu'
import { useActions } from '@/hooks/useActions/useActions'

export default function Photo() {
	const [image, setImage] = useState<File | undefined>()
	const { _id, avatar, firstName, secondName, background } = useTypedSelector(state => state.user)
	const inputRef = useRef<HTMLInputElement>(null)
	const inputAvatarRef = useRef<HTMLInputElement>(null)
	const location = useLocation()
	const urlAvatar = 'https://live.staticflickr.com/65535/52895494468_38474d353c_m.jpg'
	const { changeUser } = useActions()

	function handleImageClick() {
		inputRef.current?.click()
	}

	function handleImageAvatarClick() {
		inputAvatarRef.current?.click()
	}

	function handleImageChangeBackground(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		const payload = {
			_id,
			background: file
		}


	}

	function handleImageAvatarChange(e: any) {
		const file = e.target.files[0]
		console.log(file)
	}

	return (
		<div>
			<div className={classes.title_photo}>Фото профиля и изображение обложки</div>

			<div className={classes.wrapper_photo}>
				<div className={classes.background}  >
					<Link state={{ background: location }} to={`/user/${_id}/configuration/backgroundEdit`}>
					{background && <img className={classes.background_img} src={background} />}
					<div className={classes.background_shadow}>
						<div className={classes.download_title}>Загрузить новое фото</div>
						<span className={classes.download_logo}>
							<AiOutlinePicture />
						</span>

					</div>
					</Link>
				</div>


				<input hidden type={'file'} ref={inputAvatarRef} onChange={handleImageAvatarChange} />
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
						{/*<Link state={{ background: location }} to={`/user/${_id}/configuration/avatarEdit`}>*/}
						<div className={classes.logo_avatar}>
							<MdAddAPhoto />
						</div>
						 <ContextMenu userId={_id}/>
						{/*</Link>*/}
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
