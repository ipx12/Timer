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
	const [intervalId, setIntervalId] = useState(0);

	const dispatch = useDispatch();

	const timerStatus = useSelector(timerActiveStatus);
	const showModal = useSelector(modalIsOpen);
	const {seconds, minutes, hours } = useSelector(timeSpend)

	const intervalActiveToggle = () => {
		if (intervalId) {
		  clearInterval(intervalId);
		  setIntervalId(0);
		  return;
		}
	
		const newIntervalId = setInterval(() => {
			dispatch(updateTime());
		}, 1000);
		setIntervalId(newIntervalId);
	  };

	useEffect(() => {
		if (timerStatus) {
			intervalActiveToggle();	
		}
	}, [])


	const onTimerActive = () => {
		dispatch(startTimer(Date.now()));
		dispatch(updateTime());
		dispatch(timerStatusToggle());
		intervalActiveToggle();
	}

	const onTimerStopped = () => {
		dispatch(setActiveTimerName(timerName))
		dispatch(timerStatusToggle());
		dispatch(addTimer());
		dispatch(clearTimer());
		setTimerName('');
		intervalActiveToggle();
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
