import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';
import { timerActiveStatus, modalIsOpen } from './timerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { 
	addTimer,
	updateTime, 
	timeSpend, 
	startTimer, 
	timerStatusToggle,
	clearTimer,
	setActiveTimerName,
	toggleShowModal
} from './timerSlice';

import Modal from '../Modal/Modal';

import './timer.scss';

const Timer = () => {
	const [timerName, setTimerName] = useState('')

	const dispatch = useDispatch();

	const timerStatus = useSelector(timerActiveStatus);
	const showModal = useSelector(modalIsOpen);
	const {seconds, minutes, hours } = useSelector(timeSpend)

	useEffect(() => {
		const intrerval = setInterval(() => {
			if (timerStatus) {
				dispatch(updateTime())
			}
		}, 1000)

		return () => clearInterval(intrerval)
	}, [timerStatus])


	const onTimerActive = () => {
		dispatch(startTimer(Date.now()));
		dispatch(updateTime());
		dispatch(timerStatusToggle());
	}

	const onTimerStopped = () => {
		dispatch(setActiveTimerName(timerName))
		dispatch(timerStatusToggle());
		dispatch(addTimer());
		dispatch(clearTimer());
		setTimerName('')
	}

	return (
		<div className='timer'>
			{showModal ? <Modal/> : null}
			<input value={timerName}
					onFocus={(e) => e.target.value = ''}
					onChange={(e) => setTimerName(e.target.value)}
					placeholder='Name of your task ' 
					type="text"/>
			<div className='timer-round'>
				{`${hours}:${minutes}:${seconds}`}
			</div>
			<Button className='timer-btn'
					onClick={() => {
						if (!timerStatus) {
							onTimerActive();
						} else if (timerName.length > 0) {
							onTimerStopped();
						} else {
							dispatch(toggleShowModal());
						}
					}}>
				{timerStatus ? 'STOP' : 'START'}
			</Button>
		</div>
	);
}

export default Timer;
