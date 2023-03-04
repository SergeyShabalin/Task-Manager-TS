import React, { useRef } from 'react'
import classes from '../Greeting.module.css'
import { Button } from '@UI'
import { BsThreeDots } from 'react-icons/bs'
import useOpenClose from '@/hooks/UseOpenClose'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import { Board } from '@/models/Boards'
import { useActions } from '@/hooks/useActions/useActions'

interface MiniBoardProps{
	board: Board
	openBoard: (boardId: string)=>  void
	userId: string
}

export default function MiniBoard({ board, openBoard, userId }: MiniBoardProps) {
	const { onClose, onOpen, isOpen } = useOpenClose()
	const editorRef = useRef(null)
	const {deleteBoard} = useActions()
	useOnClickOutside(editorRef, onClose)

	function openEditor() {
		onOpen()
	}

	function boardDelete(boardId: string){
		deleteBoard(boardId, userId)
	}

	return (
		<div key={board._id} className={board.background && classes[board.background]}>
			<span className={classes.title_board} onClick={() => openBoard(board._id)}>
				{board.title}
			</span>
			<div className={board.background && classes.board_edit}>
				<Button icon={<BsThreeDots />} onClick={openEditor} />
			</div>
			{isOpen && (
				<div className={classes.editor} ref={editorRef}>
				<h1>Действия с доской</h1>
					<hr/>
					<ul>
						<li>Открыть</li>
						<li onClick={()=>boardDelete(board._id)}>Удалить</li>
					</ul>
				</div>
			)}
		</div>
	)
}
