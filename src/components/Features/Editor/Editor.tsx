import React, { useState } from 'react'
import { Button, Input } from '@UI/'
import { GrClose } from 'react-icons/gr'
import useOpenClose from '@/hooks/UseOpenClose'

//TODO добавить лоадер после onSubmit в кнопку сохранить.
// Если выйдет ошибка(если onSubmit вернул false)!!
// - не закрывать модалку вывеcти notification
// и задизейблить кнопку пока состояние не изменится
// повесить useclickOutside внутри компонента
// !поставить alios на папку features и UI (возможно еще что-то удобное сделать)
//TODO стилистика норм
//TODO роутинг как время останется


interface EditorProps {
	buttonSubmitTitle: string
	rows?: number
	cols?: number
	placeholder?: string
	defaultValue?: string
	onSubmit: (value: string) => void
	children: React.ReactElement
	isAdd?: boolean
	isClose?: boolean
}

export default function Editor({
	buttonSubmitTitle,
	onSubmit,
	defaultValue = '',
	rows = 3,
	placeholder,
	cols = 32,
	children,
	isAdd = true,
	isClose = true
}: EditorProps) {
	const [inputValue, setInputValue] = useState(defaultValue)
	const { onClose, onOpen, isOpen } = useOpenClose()

	function changeInput({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setInputValue(target.value)
	}

	function saveChanged(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (e.code === 'Enter') sendValue()
	}

	function sendValue() {
		onSubmit(inputValue)
		onClose()
	}
	//TODO при закрытии чистить value у инпута
	if (!isOpen) return <div onClick={onOpen}>{children}</div>

	return (
		<div style={{ background: 'gray' }}>
			<Input
				autoFocus
				rows={rows}
				value={inputValue}
				placeholder={placeholder}
				cols={cols}
				onKeyDown={saveChanged}
				onChange={changeInput}
			/>
			<div style={{ display: 'flex' }}>
				{isAdd && <Button	variant='contained'	color='primary' title={buttonSubmitTitle}	onClick={sendValue} />}
				{isClose && <Button variant='just_icon' icon={<GrClose />} onClick={onClose} />}
			</div>
		</div>
	)
}
