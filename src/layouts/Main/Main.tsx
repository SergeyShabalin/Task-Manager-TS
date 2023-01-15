import React, { useEffect } from 'react'

import { Board } from '@Features'
import Header from './Header'

import classes from './Main.module.css'
import UiKit from '@/components/UIKit'
import Editor from '@/components/Features/Editor'

export default function Main() {
	function addNewColumn(value: any) {

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
