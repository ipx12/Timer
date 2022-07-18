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

export default function reducer(state = initialState, action) {
    return state;
}