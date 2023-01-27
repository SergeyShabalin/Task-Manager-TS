import React, { useRef } from 'react'
import { Dispatch } from 'redux'

import { Editor } from '@Features'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { BoardActions } from '@/store/board/reducer'
import classes from './ContextMenu.module.css'
import { RiDeleteBin5Line } from 'react-icons/all'


interface ContextMenuProps {
	title?: string
	contextClose?: () => void
	changeCardTitle: (title: string) => (dispatch: Dispatch<BoardActions>) => Promise<boolean>
	cardDelete?: () => void
}

export default function ContextMenu({ title, contextClose, changeCardTitle, cardDelete }: ContextMenuProps) {

	const cxtRef = useRef(null)
	useOnClickOutside(cxtRef, closeModal)

	function closeModal() {
	}

	return (
		<form className={classes.contextWrapper}>
			<div ref={cxtRef}>
				<Editor
					buttonSubmitTitle='Сохранить'
					nonChildren
					onSubmit={changeCardTitle}
					placeholder='Введите название карточки'
					defaultValue={title}
				/>
			</div>
			<div>
				<ul className={classes.ul}>
					<li className={classes.li}>
						<RiDeleteBin5Line />
						<div className={classes.li_title} onClick={cardDelete}>Удалить карточку</div>
					</li>
				</ul>
			</div>
		</form>
	)
}

