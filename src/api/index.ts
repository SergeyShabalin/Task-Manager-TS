import axios from 'axios'
import io from 'socket.io-client'
let userId = null;
export const socketCon = () => {
	userId = io('http://localhost:4000')
	return userId
}

export const Api = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		authorization: `Bearer ${localStorage.getItem('token') || ''}`
	}
})
