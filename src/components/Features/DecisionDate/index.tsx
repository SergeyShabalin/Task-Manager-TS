import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { AiOutlineFieldTime } from "react-icons/ai";

import classes from "./DecisionDate.module.css";

interface DecisionDateTypes{
	decisionDate: Date
}

export default function DecisionDate({ decisionDate }: DecisionDateTypes) {

	const [isYear, setIsYear] = useState(false);
	const changedDate = new Date(decisionDate).getTime();
	const now = new Date().getTime();

	const yearNow = new Date().getFullYear();
	const year = new Date(decisionDate).getFullYear();

	useEffect(() => {
		if (yearNow !== year) setIsYear(true);
	}, [decisionDate]);

	const cardDateWithYear = format(changedDate, "PP", { locale: ru });
	const cardDate = format(changedDate, "d MMMM", { locale: ru });

	return (
		<div className={changedDate < now
			? `${classes.over_decision_date}`
			: `${classes.decision_date}`}>
			<div className={classes.icon}>
				<AiOutlineFieldTime />
			</div>
			<div className={classes.date}>
				{!isYear
					? cardDate
					: cardDateWithYear}
			</div>
		</div>
	);
};
