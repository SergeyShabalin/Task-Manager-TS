import React, { useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

import classes from './CropImage.module.css'
import classesFromPhoto from '../../Photo/Photo.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import axios from 'axios'
import { Api } from '@/api'


interface cropProps {
	image: string
}

export default function CropImage({ image }: cropProps) {

	const [croppedImage, setCroppedImage] = useState<string | ''>('')
	const [scale, setScale] = useState<number>(1)
	const { _id, avatar, firstName, secondName, background } = useTypedSelector(state => state.user)
	const { changeUser } = useActions()
	const editorRef = useRef(null)
	const formData = new FormData()

	const onMouseUp = () => {
		if (editorRef.current) {
			const canvasScaled = editorRef.current.getImageScaledToCanvas()
			const dataURL = canvasScaled.toDataURL()
			setCroppedImage(dataURL)
		}
	}


	function scaleImage(e) {
		setScale(e.target.value)
		onMouseUp()
	}

	async function saveBackground() {

		formData.append('background', image, _id)
		try {
			const imageUrl = await Api.post(`/user/sendIMG`, formData)
			console.log({ imageUrl })
		} catch (e) {
			console.log(e)
		}

		// changeUser(formData)
	}


	return (
		<div className={classes.wrapper}>
			<div className={classes.background_editor}>
				<AvatarEditor
					ref={editorRef}
					image={image}
					width={624}
					height={112}
					border={50}
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
						<Button variant={'contained'} color={'primary'} title={'сохранить'} onClick={saveBackground} />
						<Button variant={'contained'} color={'primary'} title={'сохранить redux'} onClick={saveBackground} />
					</div>

				</div>

			</div>


		</div>
	)
}
