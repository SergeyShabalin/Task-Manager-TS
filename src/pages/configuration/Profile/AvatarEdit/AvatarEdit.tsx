import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'
import { Button, Modal } from '@UI'
import classes from './AvatarEdit.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { useActions } from '@/hooks/useActions/useActions'

export default function AvatarEdit() {
	const user = useTypedSelector(state => state.user),
		navigate = useNavigate()

	const [preview, setPreview] = useState('')
	const [avatar, setAvatar] = useState<File | undefined>(undefined)
	const formData = new FormData()
	const { changeAvatarUser } = useActions()

	function closePhoto() {
		setPreview('')
	}

	function cropPhoto(photo: string) {
		const file = dataURLtoFile(photo, 'avatar.png', 'image/png')
		setAvatar(file)
		setPreview(photo)
	}

	const dataURLtoFile = (dataURL: string, filename: string, fileType: string) => {
		const arr = dataURL.split(',')
		const decodedData = atob(arr[1])
		const byteCharacters = Array.from(decodedData).map((char) =>
			char.charCodeAt(0)
		)
		const byteArray = new Uint8Array(byteCharacters)
		return new File([byteArray], filename, { type: fileType })
	}

	function closeModal() {
		navigate(`/user/${user._id}/configuration/profile`)
	}

	function downloadPhoto() {
		if (avatar){
			formData.append('background', avatar, user._id)
		}
		changeAvatarUser(formData)
		closeModal()
	}

	return (
		<Modal onClose={closeModal} open>
			<div className={classes.wrapper}>
				<h1 className={classes.title}>Редактирование фото</h1>
				<span className={classes.title_info}>
					Загрузите свое изображение в формате "jpg" или "jpeg"
				</span>

				<div className={classes.select_avatar}>
					<Avatar
						label='Выберите фото'
						labelStyle={{
							fontSize: '20px',
							color: '#7a869A',
							cursor: 'pointer',
							padding: '75px',
							height: '100%'
						}}
						cropColor={'yellow'}
						shadingOpacity={0.75}
						closeIconColor={'yellow'}
						exportQuality={1}
						shadingColor={'black'}
						width={300}
						height={300}
						onClose={closePhoto}
						onCrop={cropPhoto}
						exportSize={500}
					/>
				</div>

				<div className={classes.preview_wrapper}>
					{preview ? (
						<>
							<div className={classes.preview}>
								<img src={preview} />
							</div>
							<div className={classes.person_info}>
								<div className={classes.name}>{user.secondName + ' ' + user.firstName}</div>
								<span className={classes.email}>{user.email}</span>
							</div>
						</>
					) : (
						<div className={classes.appearance}>Изображение в миниатюре</div>
					)}
				</div>

				<div className={classes.control}>
					<div className={classes.control_btn}>
						<div className={classes.cancel_btn}>
							<Button title='Отменить' variant='outlined' onClick={closeModal} />
						</div>
						{preview && (
							<Button
								title='Загрузить'
								color='primary'
								variant='contained'
								onClick={downloadPhoto}
							/>
						)}
					</div>
				</div>
			</div>
		</Modal>
	)
}
