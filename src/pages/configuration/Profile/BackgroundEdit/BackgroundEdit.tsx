import React, { ChangeEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Modal } from '@UI'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import CropImage from '@/pages/configuration/Profile/BackgroundEdit/CropImage'
import classes from './BackgroundEdit.module.css'

export default function BackgroundEdit() {
	const userId = useTypedSelector(state => state.user._id)
	const navigate = useNavigate()
	const [preview, setPreview] = useState<File | undefined>(undefined)
	const inputRef = useRef<HTMLInputElement>(null)

	function handleImageClick() {
		inputRef.current?.click()
	}

	function closeModal() {
		navigate(`/user/${userId}/configuration/profile`)
	}

	function handleImageChangeBackground(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (file) setPreview(file)
	}

	return (
		<Modal onClose={closeModal} open>
			<div className={classes.wrapper}>
				<h1 className={classes.title}>Редактирование обоев</h1>
				<div className={classes.control}>
					{!preview
					?	<div className={classes.title_info} onClick={handleImageClick}>Загрузите ваше изображение </div>
					 : 	<Button title='Загрузить изображение' variant='outlined' color='primary' onClick={handleImageClick} />
					}
				</div>

				<div className={classes.crop}>
					{preview && <CropImage closeModal={closeModal} image={preview} />}
					<input ref={inputRef} hidden type={'file'} onChange={handleImageChangeBackground} />
				</div>
			</div>
		</Modal>
	)
}
