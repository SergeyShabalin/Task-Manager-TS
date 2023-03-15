import axios from 'axios'
import io from 'socket.io-client'

export const socket = io('http://localhost:4000')

export const Api = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		authorization: `Bearer ${localStorage.getItem('token') || ''}`
	}
})
