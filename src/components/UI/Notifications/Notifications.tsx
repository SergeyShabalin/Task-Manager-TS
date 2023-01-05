import React, { useEffect, useMemo } from 'react'

//TODO snackbar из MUI закрытие по таймауту


interface NotificationsTypes {
	open: boolean
	onClose?: () => void
	ref?: React.LegacyRef<HTMLDivElement>
}

export default function Notifications({ open, onClose, ref }: NotificationsTypes) {
	if (!open) return null
	return <div style={{ position: 'absolute', right: '50px', top: '50px' }}>snackkk</div>
}
