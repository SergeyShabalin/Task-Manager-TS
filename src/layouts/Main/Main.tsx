import React, { useEffect } from 'react'

import Board from '@/components/Features/Board'
import Header from './Header'

import classes from './Main.module.css'
import UiKit from '@/components/UIKit'
import Editor from '@/components/Features/Editor'

export default function Main() {
	function addNewColumn(value: any) {
		console.log('value', value)
		// const isAdded = await dispatch(addNewColumn())
		// return isAdded TODO (если onSubmit вернул false)!!
	}

	return (
		<div className={classes.main}>
			<div className={classes.header_main}>
				<Header />
			{/*	<div className={classes.work_space}>*/}
			{/*		<UiKit />*/}
					<Board />
					{/*<Editor*/}
					{/*	buttonSubmitTitle='добавление колонки'*/}
					{/*	defaultValue='дефолтное'*/}
					{/*	placeholder='введите значение'*/}
					{/*	onSubmit={addNewColumn}*/}
					{/*>*/}
					{/*	<div>Кликнуть по чилдрену</div>*/}
					{/*</Editor>*/}
				</div>
			{/*</div>*/}
		</div>
	)
}
