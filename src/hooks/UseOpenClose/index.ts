import { useState } from 'react'

interface UseOpenCloseTypes {
	onOpen: () => void
	onClose: () => void
	isOpen: boolean
}

export default function useOpenClose( defaultValue = false ): UseOpenCloseTypes {
	const [isOpen, setIsOpen] = useState(defaultValue)

	function onOpen() {
		setIsOpen(true)
	}

	function onClose() {
		setIsOpen(false)
	}

	return {
		onOpen,
		onClose,
		isOpen
	}
}
