import React, { useState } from 'react'
import classes from './Sidebar.module.css'
import { Button } from '@UI'
import { AiOutlineUser } from 'react-icons/ai'
import { FiCheckSquare } from 'react-icons/fi'
import { BsCalendar2Date } from 'react-icons/bs'
import AddUsers from '@/components/Features/Card/components/Sidebar/AddUsers'
import AddChecklist from '@/components/Features/Card/components/Sidebar/AddChecklist'
import AddDate from '@/components/Features/Card/components/Sidebar/AddDate'

export default function Sidebar() {
	const [isOpenUsers, setIsOpenUsers] = useState(false)
	const [isOpenChecklist, setIsOpenChecklist] = useState(false)
	const [isOpenDate, setIsOpenDate] = useState(false)

	function openUsers() {
		setIsOpenUsers(true)
	}

	function closeUsers() {
		setIsOpenUsers(false)
	}

	function openChecklist() {
		setIsOpenChecklist(true)
	}

	function closeChecklist() {
		setIsOpenChecklist(false)
	}

	function openDate() {
		setIsOpenDate(true)
	}

	function closeDate() {
		setIsOpenDate(false)
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.title}>Добавить на карточку</div>
			<div className={classes.users}>
				<Button
					startIcon={<AiOutlineUser className={classes.icon} />}
					title='Участники'
					variant='full_contain'
					onClick={openUsers}
				/>
				{isOpenUsers && <AddUsers closeUsers={closeUsers} />}
			</div>
			<div className={classes.checklist}>
				<Button
					startIcon={<FiCheckSquare className={classes.icon} />}
					title='Чек-лист'
					variant='full_contain'
					onClick={openChecklist}
				/>
				{isOpenChecklist && <AddChecklist closeChecklist={closeChecklist} />}
			</div>
			<div className={classes.date}>
				<Button
					startIcon={<BsCalendar2Date className={classes.icon} />}
					title='Даты'
					variant='full_contain'
					onClick={openDate}
				/>
				{isOpenDate && <AddDate closeDate={closeDate} />}
			</div>
		</div>
	)
}
