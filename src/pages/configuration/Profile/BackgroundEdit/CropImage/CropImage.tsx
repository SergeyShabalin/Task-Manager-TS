import React, { ChangeEvent, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'


import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './CropImage.module.css'
import classesFromPhoto from '../../Photo/Photo.module.css'

interface cropProps {
	image: File
	closeModal: () => void
}

export default function CropImage({ image, closeModal }: cropProps) {
	const [croppedImage, setCroppedImage] = useState<string | ''>('')
	const [scale, setScale] = useState<number>(1)
	const blob = new Blob()
	const [imageForBack, setImageForBack] = useState<File | Blob>(blob)
	const { _id, avatar, firstName, secondName } = useTypedSelector(state => state.user)
	const { changeBackgroundUser } = useActions()
	const editorRef = useRef<AvatarEditor>(null)
	const formData = new FormData()

	function onMouseUp() {
		if (editorRef.current) {
			const canvasScaled = editorRef.current.getImageScaledToCanvas()
			const dataURL = canvasScaled.toDataURL()
			setCroppedImage(dataURL)
			const convertedImg = dataURLtoFile(dataURL, Date.now().toString())
			setImageForBack(convertedImg)
		}
	}

	function scaleImage(e: ChangeEvent<HTMLInputElement>) {
		setScale(Number(e.target.value))
		onMouseUp()
	}

	function dataURLtoFile(dataURL: string, filename: string) {
		const [fileType, encodedData] = dataURL.split(',')
		const decodedData = atob(encodedData)
		const byteCharacters = Array.from(decodedData).map(char => char.charCodeAt(0))
		const byteArray = new Uint8Array(byteCharacters)
		return new File([byteArray], filename, { type: fileType })
	}

	function saveBackground() {
		formData.append('background', imageForBack, _id)
		changeBackgroundUser(formData)
		closeModal()
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.background_editor}>
				<AvatarEditor
					ref={editorRef}
					image={image}
					width={700}
					height={220}
					border={25}
					color={[0, 0, 0, 0.7]}
					scale={scale}
					rotate={0}
					onMouseUp={onMouseUp}
				/>
			</div>

			<div className={classes.input_range}>
				<input
					type='range'
					id='size'
					name='size'
					min='1'
					max='3'
					step={0.05}
					value={scale}
					onChange={scaleImage}
				/>
				<label htmlFor='volume'>Размер изображения</label>
			</div>
			<p>Миниатюра</p>
			<div className={classes.cropped_area}>
				<div className={classes.preview}>
					<div className={classes.cropped_img}>
						{croppedImage && <img className={classes.img} src={croppedImage} />}
					</div>

					<div className={classes.avatar}>
						{avatar && <img className={classes.img_avatar} src={avatar} />}
						<div className={classesFromPhoto.frame_avatar}></div>
					</div>

					<div className={classes.white_background}>
						<div className={classes.person_name}>
							<h1 className={classes.second_name}>{secondName}</h1>
							<h1 className={classes.first_name}>{firstName}</h1>
						</div>
					</div>

					<div className={classes.btn}>
						{croppedImage && (
							<Button
								variant={'contained'}
								color={'primary'}
								title={'сохранить'}
								onClick={saveBackground}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
