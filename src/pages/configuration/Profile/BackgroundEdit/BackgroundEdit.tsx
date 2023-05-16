import React, { useState } from 'react'

import 'react-image-crop/dist/ReactCrop.css'
import { useNavigate } from 'react-router-dom'

import classes from './BackgroundEdit.module.css'
import { Modal } from '@UI'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import CropImage from '@/pages/configuration/Profile/BackgroundEdit/Crop'


export default function BackgroundEdit() {
	const userId = useTypedSelector(state => state.user._id)
	const navigate = useNavigate()
	const myBlob = new Blob(["Hello, world!"], { type: "text/plain" });
	const [preview, setPreview] = useState(myBlob)

	function closeModal() {
		navigate(`/user/${userId}/configuration/profile`)
	}

	function handleImageChangeBackground(e) {
		const file = e.target.files[0]
		setPreview(file)
	}


	return (
		<Modal onClose={closeModal} open>
			<div className={classes.wrapper}>
				<h1 className={classes.title}>Редактирование обоев</h1>
				<span className={classes.title_info}>
					Загрузите свое изображение в формате "jpg" или "jpeg"
				</span>
				<div>
					{preview && <CropImage image={URL.createObjectURL(preview)} />}

					<input type={'file'} onChange={handleImageChangeBackground} />
				</div>
			</div>
		</Modal>
	)
}

