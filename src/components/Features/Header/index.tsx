import React from "react";
import { CgMenuGridO } from "react-icons/cg";
import { RiTrelloFill } from "react-icons/ri";

import classes from "./Header.module.css";
import { Button } from '@/components/UI'

export default function Header() {

	return (
		<div className={classes.header}>
			<div className={classes.menu}>
				<Button
					variant="just_icon"
					variety={true}
					color="blue"
					icon={<CgMenuGridO />}
				/>
			</div>
			{/*<Creator />*/}
			{/*{!visibility && <Share/>}*/}
			<div className={classes.logo}>
				<span className={classes.icon}> <RiTrelloFill /> </span>
				<span>TASK MANAGER</span>
			</div>
		</div>
	);
}
