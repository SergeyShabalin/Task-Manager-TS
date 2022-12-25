import React, { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

import classes from './Modal.module.css'

const modalRootElement: any = document.querySelector('#modal')

interface ModalProps {
	children: React.ReactNode
	open: boolean
	onClose: () => void
	coordinates?: any
	ref?: any
}

const Modal = ({ children, open, onClose, coordinates, ref }: ModalProps) => {
	const element = useMemo(() => document.createElement('div'), [])

	useEffect(() => {
		if (open) {
			modalRootElement.appendChild(element)
			return () => {
				modalRootElement.removeChild(element)
			}
		}
	})

	function closeModal(event: React.FormEvent) {
		if (event.target == event.currentTarget) {
			onClose()
		}
	}

	if (!open) return null
	return createPortal(
		<div className={classes.modal_background} onClick={closeModal}>
			{coordinates ? (
				<div
					className={classes.modal_card}
					style={{
						position: 'absolute',
						left: coordinates.left - 230,
						top: coordinates.top - 20
					}}
				>
					{' '}
					{children}
				</div>
			) : (
				<div ref={ref} className={classes.modal_card}>
					{children}
				</div>
			)}
		</div>,
		element
	)
}

export default Modal
