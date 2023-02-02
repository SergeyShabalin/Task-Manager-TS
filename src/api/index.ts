import axios from "axios";

export const Api =axios.create({
	baseURL: 'http://localhost:4000',
	headers:{
		authorization: 	`Bearer ${localStorage.getItem('token') || ''}`
	}
})