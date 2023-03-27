import { useEffect } from 'react'
import io from 'socket.io-client'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { UserAC } from '@/store/user/action'
import { useDispatch } from 'react-redux'

function socketCon() {
	return io('http://localhost:4000')
}

export default function useSocket() {
	const dispatch = useDispatch()
	const socket = useTypedSelector(({ user }) => user.socket)

	useEffect(() => {
		dispatch(UserAC.socketInit(socketCon()))
		return () => {
			dispatch(UserAC.socketInit(null))
		}
	}, [])

	return socket
}
