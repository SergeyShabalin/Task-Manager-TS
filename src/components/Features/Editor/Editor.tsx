import React, { useState } from 'react'
import { GrClose } from 'react-icons/gr'

import { Button, Input, Notification } from '@UI'
import useOpenClose from '@/hooks/UseOpenClose'

import classes from './Editor.module.css'

//TODO повесить useclickOutside внутри компонента
//TODO стилистика норм

interface EditorProps {
	buttonSubmitTitle: string
	rows?: number
	cols?: number
	placeholder?: string
	defaultValue?: string
	onSubmit: (title: string) => any
	children: React.ReactElement
	errorMessage?: string
}

export default function Editor({
	buttonSubmitTitle,
	onSubmit,
	defaultValue = '',
	rows = 3,
	placeholder,
	cols = 32,
	children,
	errorMessage='Что-то пошло не так...'
}: EditorProps) {
	const [inputValue, setInputValue] = useState(defaultValue)
	const { onClose, onOpen, isOpen } = useOpenClose()

	const [isLoad, setIsLoad] = useState(false)
	const [isError, setIsError] = useState(false)

	function changeInput({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setInputValue(target.value)
	}

	function saveChanged(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (e.code === 'Enter') void sendValue()
	}

	async function sendValue() {
		setIsError(() => false)
		setIsLoad(() => true)
		const isSuccess = await onSubmit(inputValue)
		setIsLoad(() => false)
		if (isSuccess) {
			onClose()
			setInputValue(defaultValue)
		} else setIsError(true)
	}

	if (!isOpen) return <div onClick={onOpen}>{children}</div>

	return (
		<>
			<Notification open={isError} message={errorMessage} />
			<div className={classes.wrapper}>
				<Input
					autoFocus
					rows={rows}
					value={inputValue}
					placeholder={placeholder}
					cols={cols}
					onKeyDown={saveChanged}
					onChange={changeInput}
					disabled={isLoad}
				/>
				{/*{isLoad && !isAdd && (*/}
				{/*	<div className={classes.editor_loader}>*/}
				{/*		<Loader size='normal' variant='global' color='lds-black' />*/}
				{/*	</div>*/}
				{/*)}*/}
				<div className={classes.control}>
						{/*{isLoad && isAdd && (*/}
						{/*	<div className={classes.btn_loader}>*/}
						{/*		<Loader size='small' variant='global' color='lds-white' />*/}
						{/*	</div>*/}
						{/*)}*/}

						{ buttonSubmitTitle && (
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
		</>
	)
}
