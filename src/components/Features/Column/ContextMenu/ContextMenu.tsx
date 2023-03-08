import React, { useRef, useState } from 'react'
import { GoKebabHorizontal } from 'react-icons/go'

import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { Button } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'
import classes from './ContextMenu.module.css'

export interface ContextMenuProps {
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
						<h1>Действия с колонкой</h1>
						<hr />
						<ul>
							<li onClick={columnDelete}>Удалить колонку</li>
						</ul>
					</div>
				</form>
			}
		</>
	)
}
