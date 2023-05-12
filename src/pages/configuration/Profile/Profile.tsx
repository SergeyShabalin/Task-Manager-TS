import React, { useRef, useState } from 'react'
import classes from './Profile.module.css'
import { AiOutlinePicture, MdAddAPhoto } from 'react-icons/all'
import { Link, useLocation } from 'react-router-dom'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

interface ProfileProps {
	userId: string
}

export default function Profile({ userId }: ProfileProps) {

	const inputRef = useRef<HTMLInputElement>(null)
	const inputAvatarRef = useRef<HTMLInputElement>(null)
	const [image, setImage] = useState()
	const location = useLocation()
	const { avatar, firstName, secondName } = useTypedSelector(state => state.user)

	function handleImageClick() {
		inputRef.current?.click()
	}

	function handleImageAvatarClick() {
		inputAvatarRef.current?.click()
	}

//TOdo поправить any
	function handleImageChange(e: any) {
		const file = e.target.files[0]
		console.log(file)
		setImage(file)
	}

	function handleImageAvatarChange(e: any) {
		const file = e.target.files[0]
		console.log(file)
	}


	return (
		<div className={classes.wrapper}>
			<h1 className={classes.title_profile}>Настройки профиля</h1>
			<div className={classes.content}>
				<div className={classes.title_photo}>Фото профиля и изображение обложки</div>

				<div className={classes.wrapper_photo}>
					<div className={classes.background} onClick={handleImageClick}>
						{image && <img src={URL.createObjectURL(image)} />}
						<div className={classes.background_shadow}>
							<div className={classes.download_title}>Загрузить новое фото</div>
							<span className={classes.download_logo}><AiOutlinePicture /></span>
						</div>
					</div>

					<input hidden type={'file'} ref={inputRef} onChange={handleImageChange} />
					<input hidden type={'file'} ref={inputAvatarRef} onChange={handleImageAvatarChange} />
					<div className={classes.avatar}>
						{!avatar ?
							<img className={classes.img}
									 src={'https://avatars.mds.yandex.net/i?id=24affb1a8027ca093f1eed6f1bd35ef10e6760b1-8340947-images-thumbs&n=13'} />
							: <img className={classes.img} src={avatar} />
						}
						<div className={classes.frame_avatar}></div>
						<div className={classes.avatar_shadow}>
							<Link
								state={{ background: location }}
								to={`/user/${userId}/configuration/avatarEdit`}
							>
								<div className={classes.logo_avatar}><MdAddAPhoto /></div>
							</Link>
						</div>

					</div>

					<div className={classes.white_background}>
						<div className={classes.person_name}>
							<h1 className={classes.second_name}>{secondName}</h1>
							<h1 className={classes.first_name}>{firstName}</h1>
						</div>
					</div>
				</div>

				<div className={classes.title_photo}>Информация о пользователе</div>
				<div className={classes.person_wrapper}>
				информация
				</div>
			</div>

		</div>
	)
}
