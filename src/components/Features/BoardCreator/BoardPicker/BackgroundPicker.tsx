import React, { useRef, useState } from 'react'
import classes from './BackgroundPicker.module.css'
import { BsCheckLg } from 'react-icons/bs'
import useOnClickOutside from '@/hooks/UseOnClickOutside'

export interface BackgroundPickerProps {
	picker: string
}
export default function BackgroundPicker({ picker }: BackgroundPickerProps) {
	const [isActive, setIsActive] = useState(false)
	const pickerRef = useRef(null)
	useOnClickOutside(pickerRef, () => setIsActive(false))

	function setPicker() {
		setIsActive(true)
	}
	return (
		<div
			ref={pickerRef}
			className={`${classes[picker]} ${isActive && classes.picker_active}`}
			onClick={setPicker}
		>
			{isActive && (
				<div className={classes.check}>
					<BsCheckLg />
				</div>
			)}
		</div>
	)
}
