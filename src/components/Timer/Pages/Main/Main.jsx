import PropTypes from "prop-types";
import { formatTimestamp } from "../../../../utils/timeManager";
import TimeShower from "./TimeShower";

function Main({
    activeLink,
    runningTime,
    setRunningTime,
    setTimerFrom,
    stopTimer,
}) {
    const timeObject = formatTimestamp(runningTime);

    return (
        <div onClick={() => stopTimer()}>
            <TimeShower
                timeObject={timeObject}
                setRunningTime={setRunningTime}
                setTimerFrom={setTimerFrom}
                activeLink={activeLink}
            />
        </div>
    );
}

Main.propTypes = {
    activeLink: PropTypes.object,
    runningTime: PropTypes.number,
    setRunningTime: PropTypes.func,
    setTimerFrom: PropTypes.func,
    stopTimer: PropTypes.func,
};

export default Main;
