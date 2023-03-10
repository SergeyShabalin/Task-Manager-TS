import React, { useEffect, useRef, useState } from 'react'
import { GrClose } from 'react-icons/gr'

import { Button, Input } from '@UI'
import useOpenClose from '@/hooks/UseOpenClose'
import useOnClickOutside from '@/hooks/UseOnClickOutside'

import classes from './Editor.module.css'

interface EditorProps {
	buttonSubmitTitle: string
	rows?: number
	cols?: number
	placeholder?: string
	defaultValue?: string
	onSubmit: (title: string) => any
	children?: React.ReactElement,
	nonChildren?: boolean
	color?: 'black' | 'white' | 'transparent' | 'outlined'
	variant?: 'normal' | 'large'
}

export default function Editor({
																 buttonSubmitTitle,
																 onSubmit,
																 defaultValue = '',
																 rows = 3,
																 placeholder,
																 cols = 32,
																 children,
																 nonChildren = false,
																 color = 'white',
																 variant = 'normal'
															 }: EditorProps) {

	const [inputValue, setInputValue] = useState(defaultValue)
	const { onClose, onOpen, isOpen } = useOpenClose()
	const [isLoad, setIsLoad] = useState(false)
	const editorRef = useRef(null)

	useOnClickOutside(editorRef, onClose)

	useEffect(() => {
		if (nonChildren) onOpen()
		setInputValue(defaultValue)
	}, [defaultValue])

	function changeInput({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setInputValue(target.value)
	}

	function saveChanged(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (e.code === 'Enter') void sendValue()
	}

	async function sendValue() {
		setIsLoad(() => true)
		const isSuccess = await onSubmit(inputValue)
		setIsLoad(() => false)
		if (isSuccess) {
			setInputValue(inputValue)
			onClose()
			setInputValue('')
		}
	}

	if (!isOpen) return <div onClick={onOpen}>{children}</div>

	return (
		<div className={classes.wrapper} ref={editorRef}>
			<Input
				autoFocus
				autoComplete='off'
				rows={rows}
				value={inputValue}
				color={color}
				placeholder={placeholder}
				cols={cols}
				variant={variant}
				onKeyDown={saveChanged}
				onChange={changeInput}
				disabled={isLoad}
			/>
			<div className={rows !== 1 ? classes.control : classes.control_one_row}>
				{buttonSubmitTitle && (
					<div className={classes.add_btn}>
						<Button
							disabled={isLoad}
							variant={isLoad ? 'outlined' : 'contained'}
							color='primary'
							title={buttonSubmitTitle}
							onClick={sendValue}
						/>
						<Button variant='just_icon' icon={<GrClose />} onClick={onClose} />
					</div>
				)}
			</div>
		</div>
	)
}
