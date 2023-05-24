import React, { useEffect } from 'react'
import classes from './CurrentUsers.module.css'
import { AiOutlineUser } from 'react-icons/ai'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useParams } from 'react-router-dom'
import { userOneCard } from '@/models/Users'
import User from '@/components/Features/Card/components/CurrentUsers/User'


export default function CurrentUsers() {

	const usersOneCard = useTypedSelector(state => state.board.usersOneCard)

	const listMembers = usersOneCard?.map((user: userOneCard[]) => {
		return (
			<User user={user} key={user._id} />
		)
	})

	return (
		<>
			{usersOneCard.length !== 0
				&& <div className={classes.wrapper}>
					<div className={classes.header}>
						<AiOutlineUser className={classes.icons} />
						<h4 className={classes.description_title}>Участники</h4>
					</div>
					<div className={classes.members}>{usersOneCard && listMembers}</div>
					<div className={classes.content}></div>
				</div>
			}
				</>

				)
			}
