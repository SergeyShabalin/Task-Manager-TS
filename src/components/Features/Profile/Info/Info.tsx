import React from 'react'
import classes from './Info.module.css'
import { User } from '@/models/Users'
import { AiFillSetting, GoMailRead, GrWorkshop, MdOutlineHomeWork, MdOutlinePeopleAlt } from 'react-icons/all'

interface InfoProps {
	user: Partial<User>
}

export default function Info({ user }: InfoProps) {

	const {
		email,
		department,
		position,
		organization
	} = user

	return (
		<div className={classes.wrapper}>
			<div className={classes.content}>
				<h1>Подробная информация</h1>
				<hr />
				<div className={classes.info}>
					<div className={classes.email}><GoMailRead className={classes.icon_email} /> email: {email}</div>
					{organization && <div className={classes.organization}><MdOutlineHomeWork className={classes.icon_organization} /> организация:{organization}</div>}
					{department && <div className={classes.department} ><MdOutlinePeopleAlt className={classes.icon_department} />{department}</div>}
					{position && <div className={classes.position} ><AiFillSetting className={classes.icon_position} />{position}</div>}

				</div>
			</div>

		</div>
	)
}
