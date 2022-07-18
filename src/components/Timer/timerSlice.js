import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

const initialState = {
    timers: [],
    timerActiveName: '',
    timerActive: false,
    timerStart: null,
    timeStartMs: null,
    timeSpend: {
        seconds: '00',
        minutes: '00',
        hours: '00'
    },
    showModal: false
};

export const addZero = (num) => {
    if (num <= 9) {
        return '0' + num;
    } else {
        return num;
    }
}

const timeStampToDate = (time, string) => {
    if (!string) {
        return {
            seconds: addZero(Math.floor(((Date.now() - time) / 1000) % 60)),
            minutes: addZero(Math.floor(((Date.now() - time) / 1000 / 60) % 60)),
            hours: addZero(Math.floor(((Date.now() - time) / (1000 * 60 * 60)) % 24))
        }
    }
}

export const getDateString = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};

function generateRandomInteger(min, max) {
	return Math.floor(min + Math.random()*(max + 1 - min))
}

const milisecondsToMinets = (minutes) => {
    return minutes * 60000
}

const generateGraph = () => {
    const data = [];
    const graphsCount =  generateRandomInteger(10, 15); 
    for (let i = graphsCount; i !== 0; i--) {
        const randomTimerStart = Date.now() - generateRandomInteger(milisecondsToMinets(60), milisecondsToMinets(1380));
        const randomTimePeriod = generateRandomInteger(milisecondsToMinets(10), milisecondsToMinets(90));
        const randomTimeEnd = randomTimerStart + randomTimePeriod;
        const randomTimeSpend = new Date(randomTimePeriod)

        const id = uuid();
        data.push({
            id: id,
            task: id,
            timeStart: getDateString(randomTimerStart),
            timeStartMs: randomTimerStart,
            timeEnd: getDateString(randomTimeEnd),
            timeEndMs: randomTimeEnd,
            timeSpend: `${addZero(randomTimeSpend.getHours() - 3)}:${addZero(randomTimeSpend.getMinutes())}:${addZero(randomTimeSpend.getSeconds())}`

        })
    }
    return data;
}


export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        addTimer: (state,) => {
            const data = {
                id: uuid(),
                task: state.timerActiveName,
                timeStart: getDateString(state.timerStart),
                timeStartMs: state.timerStart,
                timeEnd: getDateString(Date.now()),
                timeEndMs: Date.now(),
                timeSpend: `${state.timeSpend.hours}:${state.timeSpend.minutes}:${state.timeSpend.seconds}`

            }
            state.timers.push(data)
        },
        updateTime: (state) => {
            state.timeSpend = timeStampToDate(state.timerStart)
        },
        startTimer: (state, action) => {
            state.timerStart = action.payload
        },
        timerStatusToggle: (state) => {
            state.timerActive = !state.timerActive
        },
        clearTimer: (state) => {
            state.timeSpend = {
                seconds: '00',
                minutes: '00',
                hours: '00'
            }
        },
        setActiveTimerName: (state, action) => {
            state.timerActiveName = action.payload
        },
        toggleShowModal: (state) => {
            state.showModal = !state.showModal
        },
        onDelete: (state, action) => {
            state.timers = state.timers.filter(timer => timer.id !== action.payload);
        },
        onGenerate: (state) => {
            state.timers = generateGraph();
        }
    }
})

const {actions, reducer} = timerSlice;

export default reducer;

export const {
                addTimer, 
                updateTime, 
                startTimer,
                timerStatusToggle,
                clearTimer,
                setActiveTimerName,
                toggleShowModal,
                onDelete,
                onGenerate,
                                    } = actions;

export const selectTimers = (state) => state.reducer.timers;
export const timerActiveStatus = (state) => state.reducer.timers.timerActive;
export const timeSpend = (state) => state.reducer.timers.timeSpend;
export const modalIsOpen = (state) => state.reducer.timers.showModal;


