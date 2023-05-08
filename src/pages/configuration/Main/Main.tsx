import React from 'react'
import Profile from '@/pages/configuration/Profile'
import Email from '@/pages/configuration/Email'
import Safety from '@/pages/configuration/Safety'
import classes from './Main.module.css'

export default function Main(page: string){

	return (
		<div className={classes.wrapper} >

			{page === 'profile ' && <div><Profile/></div>  }
			{page === 'email ' && <div><Email/></div>  }
			{page === 'safety ' && <div><Safety/></div>  }

		</div>
	)
}
