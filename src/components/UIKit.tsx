import React from 'react'
import Button from './Button/Button'
import { AiOutlinePlus, MdKeyboardArrowDown } from 'react-icons/all'

import classes from './UIKit.module.css'
import '../GlobalStyles.css'

function submit(e: any) {
	e.preventDefault()
}

const UiKit = () => {
	return (
		<form onSubmit={submit}>
			<div className={classes.buttons}>
				<div className={classes.buttons_text}>
					<Button label='text' />
					<Button label='text start icon' startIcon={<AiOutlinePlus />} />
					<Button label='text end icon' endIcon={<MdKeyboardArrowDown />} />
					<Button color='submit' label='text submit' />
					<Button color='error' label='error' />
					<Button disabled={true} label='text disabled' />
				</div>

				<div className={classes.buttons_contained}>
					<Button variant='contained' label='contained' />
					<Button variant='contained' label='contained start icon' startIcon={<AiOutlinePlus />} />
					<Button
						variant='contained'
						label='contained end icon'
						endIcon={<MdKeyboardArrowDown />}
					/>
					<Button variant='contained' color='submit' label='contained submit' />
					<Button variant='contained' color='error' label='contained error' />
					<Button variant='contained' disabled={true} label='contained disabled' />
				</div>

				<div className={classes.buttons_outlined}>
					<Button variant='outlined' label='outlined' />
					<Button variant='outlined' label='outlined start icon' startIcon={<AiOutlinePlus />} />
					<Button variant='outlined' label='outlined end icon' endIcon={<MdKeyboardArrowDown />} />
					<Button variant='outlined' color='submit' label='outlined submit' />
					<Button variant='outlined' color='error' label='outlined error' />
					<Button variant='outlined' disabled={true} label='outlined disabled' />
				</div>
			</div>
		</form>
	)
}

export default UiKit
