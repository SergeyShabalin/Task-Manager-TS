import React, { ChangeEvent } from 'react'
import classes from './Search.module.css'
import { Input } from '@UI'
import { useActions } from '@/hooks/useActions/useActions'


interface usersProps{
	boardId: string | undefined
}

export default function Search({boardId}: usersProps) {

	const { searchUser } = useActions()

	function applySearch(e: ChangeEvent<HTMLInputElement>) {

		if(boardId){
			const inputValue = e.target.value
			const payload = {
				search: inputValue,
				boardId
			}
			searchUser(payload)
		}
	}

	return (
		<form  className={classes.wrapper}>
			<Input placeholder='введите email' color={'blue'} onChange={applySearch}/>
		</form>
	)
}
