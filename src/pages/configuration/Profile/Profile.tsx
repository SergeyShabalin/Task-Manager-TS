import React, { useEffect, useRef, useState } from 'react'
import classes from './Profile.module.css'
import { AiOutlinePicture, MdAddAPhoto } from 'react-icons/all'
import AvatarEdit from '@/pages/configuration/Profile/AvatarEdit'

export default function Profile() {

	const inputRef = useRef<HTMLInputElement>(null)
	const inputAvatarRef = useRef<HTMLInputElement>(null)
	const [image, setImage] = useState()
	const [avatar, setAvatar] = useState(null)


	function handleImageClick(){
		inputRef.current?.click()
	}
	function handleImageAvatarClick(){
		inputAvatarRef.current?.click()
	}
	function handleImageChange(e){
		const file = e.target.files[0]
		console.log(file)
		setImage(file)
	}
	function handleImageAvatarChange(e){
		const file = e.target.files[0]
		console.log(file)
	}

	function showw(preview){
		console.log(typeof (preview))
	}

	return (
		<div className={classes.wrapper}>
			<h1 className={classes.title_profile}>Настройки профиля</h1>
			<div className={classes.content}>
				<div className={classes.title_photo}>Фото профиля и изображение обложки</div>
				<div className={classes.wrapper_photo}>
					<div className={classes.background} onClick={handleImageClick}>
						{image && <img src={URL.createObjectURL(image)}/>}
						<div className={classes.background_shadow} >
							<div className={classes.download_title}>Загрузить новое фото </div>
							<span className={classes.download_logo}><AiOutlinePicture/></span>
						</div>
					</div>

					<input hidden type={'file'} ref={inputRef} onChange={handleImageChange}/>
					<input hidden type={'file'} ref={inputAvatarRef} onChange={handleImageAvatarChange}/>
					<div className={classes.avatar} onClick={handleImageAvatarClick}>
						{avatar && <img src={avatar}/>}
						<div className={classes.avatar_shadow}>
						<span className={classes.logo_avatar}><MdAddAPhoto/></span>
						</div>
					</div>
					<div className={classes.white_background}></div>
				</div>

				<div className={classes.title_photo}>Информация о пользователе</div>

				<AvatarEdit showw={showw}/>
			</div>

		</div>
	)
}
