import React, { useState } from 'react'
import Checkout from '@/components/App/Checkout'
import DecisionDate from '@/components/App/DecisionDate'

export default function UiTest(){
	const [now] = useState(new Date().getTime()+1000000000);
	return (
		<div>
<Checkout countTask={7} doneTask={7}/>
			<DecisionDate decisionDate={now}/>
		</div>
	)
}

