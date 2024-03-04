import PropTypes from "prop-types";
import StopwatchShower from "./StopwatchShower";

function Stopwatch({ runningTime }) {
    return (
        <div>
            <StopwatchShower stopwatchObject={runningTime} />
        </div>
    );
}

Stopwatch.propTypes = {
    runningTime: PropTypes.object,
};

export default Stopwatch;
