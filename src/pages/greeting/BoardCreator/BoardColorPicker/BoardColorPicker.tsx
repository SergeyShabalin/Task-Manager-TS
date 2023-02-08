import React, { useRef, useState } from 'react'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import classes from './BoardColorPicker.module.css'
import { BsCheckLg } from 'react-icons/bs'

export interface BoardColorPickerProps{
	picker: string
}

const BoardColorPicker = ({picker}: BoardColorPickerProps) => {
	 const [isColorActive, setIsColorActive] = useState(false)
	const pickerRef = useRef(null)
	useOnClickOutside(pickerRef, () => setIsColorActive(false))

	function setPicker() {
		setIsColorActive(true)
	}
	return (
		<div
			ref={pickerRef}
			className={`${classes[picker]} ${isColorActive && classes.picker_active}` }
			onClick={setPicker}
		>
			{isColorActive && <div className={classes.check}><BsCheckLg/></div>}
		</div>
	)
}

export default BoardColorPicker