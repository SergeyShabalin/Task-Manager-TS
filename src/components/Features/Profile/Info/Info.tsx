import React from 'react'
import classes from './Info.module.css'
import { User } from '@/models/Users'
import {
	GoMailRead,
	MdOutlineHomeWork,
	MdOutlinePeopleAlt,
	RiSettings3Line,
	IoPersonCircleOutline
} from 'react-icons/all'

interface InfoProps {
	user: Partial<User>
}

export default function Info({ user }: InfoProps) {
	const { email, department, position, organization, firstName, lastName, secondName } = user
	const fullName = `${secondName}  ${firstName} ${lastName}`

	return (
		<div className={classes.wrapper}>
			<div className={classes.content}>
				<h1>Подробная информация</h1>
				<hr />
				<div className={classes.info}>
					<div className={classes.email}>
						<IoPersonCircleOutline className={classes.icon} /> полное имя:
						<span className = {classes.span}>{fullName}</span>
					</div>

					<div className={classes.email}>
						<GoMailRead className={classes.icon} /> email:
						<span className = {classes.span}>{email}</span>
					</div>
					{organization && (
						<div className={classes.organization}>
							<MdOutlineHomeWork className={classes.icon} /> организация:
							<span className = {classes.span}>{organization}</span>
						</div>
					)}
					{department && (
						<div className={classes.department}>
							<MdOutlinePeopleAlt className={classes.icon} /> отдел:
							<span className = {classes.span}>{department}</span>
						</div>
					)}
					{position && (
						<div className={classes.position}>
							<RiSettings3Line className={classes.icon} /> должность:
							<span className = {classes.span}>{position}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
