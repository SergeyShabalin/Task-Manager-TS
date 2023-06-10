import React, { useRef } from 'react'
import classes from './AddDate.module.css'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale } from  "react-datepicker";


import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

export interface AddDateProps {
	closeDate: () => void
}

export default function AddDate({ closeDate }: AddDateProps) {
	const addDateRef = useRef<HTMLDivElement | null>(null)
	useOnClickOutside(addDateRef, () => closeDate())

	const decisionDate = useTypedSelector(state => state.board.cardInfo.decisionDate)
	const socket = useTypedSelector(state => state.user.socket)
	const _id = useTypedSelector(state => state.board.cardInfo._id)

	function handleChange(decisionDate: Date) {
		const payload = { _id, decisionDate }
		if (socket?.emit('CARD_CHANGE', payload)) {
			closeDate()
		}
	}

	return (
		<div className={classes.wrapper} ref={addDateRef}>
			<h1>Установить дату</h1>
			<hr/>
			<DatePicker
				selected={decisionDate && new Date(decisionDate)}
				onChange={handleChange}
				inline
			/>
		</div>
	)
}
