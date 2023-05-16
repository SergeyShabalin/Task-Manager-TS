import React, { useEffect, useRef, useState } from 'react'
import classes from '@/pages/configuration/Profile/BackgroundEdit/BackgroundEdit.module.css'

import ReactCrop, { Crop } from 'react-image-crop'

interface cropProps {
	image: string
}
export default function CropImage({ image }: cropProps) {

	const [crop, setCrop] = useState<Crop>( {});
	const [croppedImage, setCroppedImage] = useState<string | null>(null);

	function handleCropComplete(croppedArea, croppedAreaPixels) {
		const img = new Image();
		img.src = image;
		img.onload = () => {
			const canvas = document.createElement('canvas');
			const canvasWidth = croppedAreaPixels.width * 10;
			const canvasHeight = croppedAreaPixels.height * 10;
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			const context = canvas.getContext('2d');

			context.drawImage(
				img,
				croppedAreaPixels.x*10,
				croppedAreaPixels.y*12,
				croppedAreaPixels.width*10,
				croppedAreaPixels.height*12,
				0,
				0,
				canvasWidth,
				canvasHeight
			);

			const dataURL = canvas.toDataURL();
			setCroppedImage(dataURL);
		};
	}


	return (
		<div className={classes.editor}>
			<ReactCrop
				crop={crop}
				aspect={39 / 7}
				onChange={c => setCrop(c)}
				onComplete={handleCropComplete}
			>
				{image && <img className={classes.img} src={image} />}
			</ReactCrop>
			{croppedImage && <img className={classes.cropped_img} src={croppedImage} alt="Cropped Image" />}
		</div>
	);
}
