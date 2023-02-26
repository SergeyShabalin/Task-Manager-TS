import React, { useRef, useState } from 'react'
import useOnClickOutside from '@/hooks/UseOnClickOutside'
import Done from '@/components/Features/Share/Done'
import classes from './Share.module.css'
import Control from '@/components/Features/Share/Control'

interface ShareProps {
	onClose: () => void
}

export default function Share({ onClose }: ShareProps) {
	const shareRef = useRef(null)
	const [isShare, setIsShare] = useState(false)
	useOnClickOutside(shareRef, () => onClose())

	function changeShare(value: boolean){
		setIsShare(value)
		setTimeout(()=>setIsShare(false), 5000)
	}

	return (
		<div className={classes.wrapper} ref={shareRef}>
			<div className={classes.header}>Поделиться доской</div>
			<hr />

			{!isShare ?<div> <Control changeShare={changeShare} />
			<span className={classes.user_span}>Текущие пользователи</span>
			<div className={classes.users}>
				<div className={classes.user_list}>
					<div className={classes.user}>
						<div className={classes.avatar}>S</div>
						<div className={classes.user_info}>
							<div className={classes.email}>Serg@mail.ru</div>
							<div className={classes.name}>Шабалин Сергей Валерьевич</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			: <Done />}
		</div>
	)
}
