import React, { useState, useEffect } from "react";
import classes from './Slider.module.css'
import { Card } from '@/models/Cards'

type SliderProps = Pick<Card, 'countTask' | 'doneTask'>

export default function Slider({countTask, doneTask}: SliderProps) {

	const [progress, setProgress] = useState(1);
	const checkListsProgress =((doneTask/countTask)*100)

	useEffect(() => {
		if (countTask!==0) setProgress(checkListsProgress);
	}, [checkListsProgress]);

	function changeValue() {}

	const getBackgroundSize = () => {
		return { backgroundSize: `${ (progress * 100) / 100}% 100%` };
	};

	return (
		<div className={classes.wrapper}>
			<span className={classes.progress_percent}>{countTask && progress.toFixed(0).toString()}%</span>
			<input
				type="range"
				min="0"
				max="100"
				className={progress !== 100 ? `${classes.slider}` : `${classes.done}`}
				onChange={changeValue}
				value={progress}
				style={getBackgroundSize()}
			/>
		</div>
	);
};