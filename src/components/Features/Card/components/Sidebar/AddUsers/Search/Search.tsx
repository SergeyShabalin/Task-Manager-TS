import React, { ChangeEvent } from 'react'
import classes from './Search.module.css'
import { Input } from '@UI'


interface usersProps{
	applySearch: (e: ChangeEvent<HTMLInputElement>) => void
	clearSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function Search({applySearch, clearSearch}: usersProps) {

	return (
		<form  className={classes.wrapper}>
			<Input placeholder='введите email' color={'blue'} onChange={applySearch} onKeyUp={clearSearch}/>
		</form>
	)
}
