import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectTimers } from '../../Timer/timerSlice';
import { Page404 } from '../index';

import './tuskInfo.scss'



const TuskInfo = () => {
    const {taskId} = useParams();
    const {timers} = useSelector(selectTimers);

    const timer = timers.filter(timer => timer.id === taskId);

    const renderElemet = () => {
        return (
            <div className="info">
                <div className="info__block">
                    <div className="info__block-name"><span>Name</span>: {timer[0].task}</div>
                    <div className="info__block-start"><span>Time start</span>: {timer[0].timeStart}</div>
                    <div className="info__block-end"><span>Time end</span>: {timer[0].timeEnd}</div>
                    <div className="info__block-spend"><span>Time spend</span>: {timer[0].timeSpend}</div>
                </div>
                <Link className="info-link" to='/'>Back to main page</Link>
            </div>
        )
    }

    const elemnts = timer.length !== 0 ? renderElemet() : <Page404/>;

    return (
        <>
            {elemnts}
        </>
    )
}

export default TuskInfo;