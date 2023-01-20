import React, { useRef } from 'react'
import DatePicker from 'react-datepicker'
import { ru } from 'date-fns/locale'
import { format } from 'date-fns'

import { AiOutlineClose } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import 'react-datepicker/dist/react-datepicker.css'
import Button from '@/components/UI/Button'
import useOnClickOutside from '../../../../../hooks/UseOnClickOutside'
import classes from './Deadline.module.css'
import useOpenClose from '@/hooks/UseOpenClose'
import { useActions } from '@/hooks/useActions/useActions'

export interface DeadlineProps {
	decisionDate: Date
	_id: string
}

export default function Deadline({ decisionDate, _id }: DeadlineProps) {


	const ref = useRef()
	const { onOpen, onClose, isOpen } = useOpenClose()
	const { changeCard } = useActions()

	useOnClickOutside(ref, onClose)

	function handleChange(date: Date) {
		const payload = { _id, decisionDate: date }
		changeCard(payload)
		onClose()
	}

	function deleteDate() {
		const payload = { _id, decisionDate: null }
		changeCard(payload)
	}

	const convertDateTime = decisionDate ? format(new Date(decisionDate), 'd MMMM yyyy', { locale: ru }) : null

	return (
		<div className={classes.wrapper}>
			<p className={classes.title}>Срок</p>
			<div className={classes.date_wrapper}>
        <span className={classes.date_time} onClick={onOpen}>
          {decisionDate ? convertDateTime : 'Установить срок'}
					<div className={classes.icon}> <MdKeyboardArrowDown /></div>
        </span>
				{decisionDate && <Button
					onClick={deleteDate}
					variant='just_icon'
					icon={<AiOutlineClose />} />}
				{isOpen && (
					<div className={classes.calendar_wrapper} ref={ref}>
						<DatePicker selected={decisionDate && new Date(decisionDate)} onChange={handleChange} inline />
					</div>
				)}
			</div>
		</div>
	)
};
