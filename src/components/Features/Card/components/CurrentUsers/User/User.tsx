import React from 'react'

import classes from './User.module.css'


export default function User({user}) {


	return (
		<div key={user._id} className={classes.user}>
			{user.avatar
				? <img className={classes.user_avatar} src={user.avatar} />
				: <div className={classes.empty_avatar}>{user.secondName[0].toUpperCase()+ user.firstName[0].toUpperCase()}</div>
			}
		</div>
	)
}
