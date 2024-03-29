import React, { useRef } from 'react'
import DatePicker from 'react-datepicker'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'
import { AiOutlineClose } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import 'react-datepicker/dist/react-datepicker.css'

import Button from '@/components/UI/Button'
import useOnClickOutside from '../../../../../hooks/UseOnClickOutside'
import useOpenClose from '@/hooks/UseOpenClose'

import { Card } from '@/models/Cards'
import classes from './Deadline.module.css'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

type DeadlineProps = Pick<Card, 'decisionDate' | '_id'>

const emptyDateText = 'Установить срок'

export default function Deadline({ decisionDate, _id }: DeadlineProps) {
	const datePickerRef = useRef(null)
	const { onOpen, onClose, isOpen } = useOpenClose()
	const socket = useTypedSelector(state => state.user.socket)

	useOnClickOutside(datePickerRef, onClose)

	function handleChange(decisionDate: Date) {
		const payload = { _id, decisionDate }
		if (socket?.emit('CARD_CHANGE', payload)) {
			onClose()
		}
	}

	function deleteDate() {
		const payload = { _id, decisionDate: null }
		socket?.emit('CARD_CHANGE', payload)
	}

	const convertDateTime = decisionDate
		? format(new Date(decisionDate), 'd MMMM yyyy', { locale: ru })
		: null

	return (
		<div className={classes.wrapper}>
			<p className={classes.title}>Срок</p>
			<div className={classes.date_wrapper}>
				<span className={classes.date_time} onClick={onOpen}>
					{decisionDate ? convertDateTime : emptyDateText}
					<div className={classes.icon}>
						<MdKeyboardArrowDown />
					</div>
				</span>
				{decisionDate && (
					<Button onClick={deleteDate} variant='just_icon' icon={<AiOutlineClose />} />
				)}
				{isOpen && (
					<div className={classes.calendar_wrapper} ref={datePickerRef}>
						<DatePicker
							selected={decisionDate && new Date(decisionDate)}
							onChange={handleChange}
							inline
						/>
					</div>
				)}
			</div>
		</div>
	)
}
