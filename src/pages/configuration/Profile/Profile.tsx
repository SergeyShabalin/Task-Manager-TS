import React, { useRef, useState } from 'react'
import classes from './Profile.module.css'
import { AiOutlineCloudUpload } from 'react-icons/all'

export default function Profile() {

	const inputRef = useRef<HTMLInputElement>(null)
	const [image, setImage] = useState('')

	function handleImageClick(){
		inputRef.current?.click()
	}
	function handleImageChange(e){
		const file = e.target.files[0]
		console.log(file)
	 // setImage()
	}

	return (
		<div className={classes.wrapper}>
			<h1>Настройки профиля</h1>
			<div className={classes.content}>
				<div className={classes.title_photo}>Фото профиля и изображение обложки</div>
				<div className={classes.wrapper_photo}>
					<div className={classes.background} onClick={handleImageClick}></div>
					<div className={classes.background_shadow} >
						<div>Загрузить новое фото </div>
					<span><AiOutlineCloudUpload/></span>
					</div>
					<input hidden type={'file'} ref={inputRef} onChange={handleImageChange}/>
					<div className={classes.avatar}></div>
					<div className={classes.white_background}></div>
				</div>
			</div>

		</div>
	)
}
