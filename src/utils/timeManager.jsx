function transformStopwatchToString(stopwatchObject) {
    if (stopwatchObject.hours > 0)
        return `${stopwatchObject.hours}h ${stopwatchObject.minutes
            .toString()
            .padStart(2, "0")}m ${stopwatchObject.seconds
            .toString()
            .padStart(2, "0")}s ${stopwatchObject.millisecondsTens
            .toString()
            .padStart(2, "0")}`;
    if (stopwatchObject.minutes > 0)
        return `${stopwatchObject.minutes
            .toString()
            .padStart(2, "0")}m ${stopwatchObject.seconds
            .toString()
            .padStart(2, "0")}s ${stopwatchObject.millisecondsTens
            .toString()
            .padStart(2, "0")}`;

    return `${stopwatchObject.seconds}s ${stopwatchObject.millisecondsTens
        .toString()
        .padStart(2, "0")}`;
}

function formatTimestamp(timestamp) {
    const hours = Math.floor((timestamp / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timestamp / 1000 / 60) % 60);
    const seconds = Math.floor((timestamp / 1000) % 60);

    // return `${hours}h ${minutes}m ${seconds}s`;
    return { hours, minutes, seconds };
}

function capTimeObjectToValidTime(timeObject) {
    let seconds = timeObject.seconds;
    let minutes = timeObject.minutes;
    let hours = timeObject.hours;

    if (seconds > 59) {
        seconds -= 60;
        minutes++;

        if (minutes > 59) {
            minutes -= 60;
            hours++;
        }
    }

    return { hours, minutes, seconds };
}

function capStopwatchObjectToValidTime(stopwatchObject) {
    let millisecondsTens = stopwatchObject.millisecondsTens;
    let seconds = stopwatchObject.seconds;
    let minutes = stopwatchObject.minutes;
    let hours = stopwatchObject.hours;

    if (millisecondsTens > 99) {
        millisecondsTens = 0;
        seconds += 1;

        if (seconds > 59) {
            seconds = 0;
            minutes += 1;

            if (minutes > 59) {
                minutes = 0;
                hours += 1;
            }
        }
    }

    return { hours, minutes, seconds, millisecondsTens };
}

function getSecondsAsTimestamp(seconds) {
    return seconds * 1000;
}

function getMinutesAsTimestamp(minutes) {
    const minute = getSecondsAsTimestamp(60);
    return minute * minutes;
}

function getHoursAsTimestamp(hours) {
    const hour = getMinutesAsTimestamp(60);
    return hour * hours;
}

function getTimeObjectAsTimestamp(timeObject) {
    const { hours, minutes, seconds } = timeObject;
    const timestamp =
        getHoursAsTimestamp(hours) +
        getMinutesAsTimestamp(minutes) +
        getSecondsAsTimestamp(seconds);

    return timestamp;
}

// function calculateTimeFraction(startTime, startTimestamp, currentTime)
// {
//     const currentTimestamp = new Date().getTime();

//     return ;
// }

export {
    transformStopwatchToString,
    formatTimestamp,
    capStopwatchObjectToValidTime,
    capTimeObjectToValidTime,
    getSecondsAsTimestamp,
    getMinutesAsTimestamp,
    getHoursAsTimestamp,
    getTimeObjectAsTimestamp,
};
