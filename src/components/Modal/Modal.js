import { useDispatch } from 'react-redux';
import { toggleShowModal } from '../Timer/timerSlice';

import './modal.scss';

const Modal = () => {

    const dispatch = useDispatch();

    return (
        <div className="modal">
            <div className="wrapper">
                <h2 className="modal-title">Empty task name</h2>
                <div className="modal-text">You are trying close your task without name, enter the title and try again!</div>
                <button onClick={() => dispatch(toggleShowModal())} className="modal-btn">CLOSE</button>
            </div>
        </div>
    )
}

export default Modal;