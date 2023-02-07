import React, { useRef, useState } from 'react'
import { GoKebabHorizontal } from 'react-icons/go'
import { RiDeleteBin5Line } from 'react-icons/ri'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './ContextMenu.module.css'

export interface ContextMenuProps{
	columnId: string
}

export default function ContextMenu({ columnId }: ContextMenuProps) {

	const refContextMenu = useRef(null)
	const [isModalOpen, setModalOpen] = useState(false)
	const { deleteColumn } = useActions()
	useOnClickOutside(refContextMenu, () => setModalOpen(false))

	function columnDelete() {
		const confirm = window.confirm('Удалить колонку?')
		if (confirm) deleteColumn(columnId)
	}

	function modalOpen() {
		setModalOpen(true)
	}

	return (
		<>
			<Button
				onClick={modalOpen}
				variant={'just_icon'}
				icon={<GoKebabHorizontal />}>
			</Button>

			{isModalOpen &&
				<form ref={refContextMenu}>
					<div className={classes.context_menu}>
						<span className={classes.context_header}>Действия с колонкой</span>
						<hr />
						<ul className={classes.ul}>
							<li className={classes.li}
									onClick={columnDelete}>
								<RiDeleteBin5Line /> <span className={classes.li_header}>Удалить колонку</span>
							</li>
						</ul>
					</div>
				</form>}
		</>
	)
}
