import PropTypes from "prop-types";
import { formatTimestamp } from "../../../../utils/timeManager";
import TimeShower from "./TimeShower";

function Main({ activeLink, runningTime, timeFrom, setTimerFrom, stopTimer }) {
    const timeObject = formatTimestamp(runningTime);

    return (
        <div onClick={() => stopTimer()}>
            <TimeShower
                timeObject={timeObject}
                timerHasStarted={activeLink.started}
                setTimerFrom={setTimerFrom}
            />
        </div>
    );
}

Main.propTypes = {
    activeLink: PropTypes.object,
    runningTime: PropTypes.number,
    timeFrom: PropTypes.number,
    setTimerFrom: PropTypes.func,
    stopTimer: PropTypes.func,
};

export default Main;
