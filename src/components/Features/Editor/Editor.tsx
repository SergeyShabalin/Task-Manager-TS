import React, { useEffect, useState } from 'react'
import { Button, Input, Loader, Notification } from '@UI/'
import { GrClose } from 'react-icons/gr'
import useOpenClose from '@/hooks/UseOpenClose'
import classes from './Editor.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

//TODO добавить лоадер после onSubmit в кнопку сохранить.
// Если выйдет ошибка(если onSubmit вернул false)!!
// - не закрывать модалку вывеcти notification
// и задизейблить кнопку пока состояние не изменится
// повесить useclickOutside внутри компонента

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
	isLoading?: boolean
	error?: boolean
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
																 isClose = true,
																 isLoading,
																 error
															 }: EditorProps) {
	const [inputValue, setInputValue] = useState(defaultValue)
	const { onClose, onOpen, isOpen } = useOpenClose()

	const [isLoad, setIsLoad] = useState(isLoading)
	const [isError, setIsError] = useState(error)

	useEffect(() => {
		setIsLoad(isLoading)
	}, [isLoading])

	function changeInput({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setInputValue(target.value)
	}

	function saveChanged(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (e.code === 'Enter') sendValue()
	}

	function sendValue() {
 onSubmit(inputValue)
return true
		// setInputValue('')
		// setIsError(true)
		// onClose()
	}

	if (!isOpen) return <div onClick={onOpen}>{children}</div>

	return (
		<>
			{isError && <Notification open={true} message='isError' />}
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
				{isLoad && !isAdd &&
					<div className={classes.editor_loader}>
						<Loader size='normal' variant='global' color='lds-black' />
					</div>
				}
				<div className={classes.control}>
					<div className={classes.add_btn}>
						{isLoad && isAdd &&
							<div className={classes.btn_loader}>
								<Loader size='small' variant='global' color='lds-white' />
							</div>
						}
						{isAdd &&
							<Button
								disabled={isLoad}
								variant={isLoad ? 'outlined' : 'contained'}
								color='primary'
								title={buttonSubmitTitle}
								onClick={sendValue}
							/>}
					</div>
					{isClose &&
						<Button
							variant='just_icon'
							icon={<GrClose />}
							onClick={onClose}
						/>
					}
				</div>
			</div>
		</>
	)
}
