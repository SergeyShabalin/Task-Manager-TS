import { useState } from 'react'
import io from 'socket.io-client'

export default function UseSocket() {

	let userId = null
	const [socket] = useState(socketCon())

	function socketCon() {
		userId = io('http://localhost:4000')
		return userId
	}


	return { socketCon, socket }
}

