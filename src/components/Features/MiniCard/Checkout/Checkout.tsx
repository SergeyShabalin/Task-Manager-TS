import React from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'

import classes from './Checkout.module.css'

interface CheckoutTypes {
	countTask: number
	doneTask: number
}

export default function Checkout({ countTask, doneTask }: CheckoutTypes) {
	return (
		<>
			{countTask >= 1 && (
				<div className={doneTask === countTask ? classes.checkout_done : classes.checkout}>
					<div className={classes.icon}>
						<IoMdCheckboxOutline />
					</div>
					<span className={classes.tasks}>
						{doneTask}/{countTask}
					</span>
				</div>
			)}
		</>
	)
}
