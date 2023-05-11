import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'
import { Button } from '@UI'


export default function AvatarEdit({showw}) {

	const [src, setSrc] = useState(null)
	const [preview, setPreview] = useState(null)

	function closePhoto() {
		setPreview(null)
	}

	function cropPhoto(photo) {
		setPreview(photo)
	}



	return (
		<div>
			<Avatar
				width={400}
				height={400}
				onClose={closePhoto}
				onCrop={cropPhoto}
			/>

			{preview && <img src={preview} />}

			<Button title={'показать'} variant={'outlined'} onClick={()=>showw(preview)}/>
		</div>
	)
}
