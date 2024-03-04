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
    // const timestampDate = new Date(new Date(0).getTime() + timestamp);
    // console.log(timestamp);
    // const hours = Math.floor(timestamp / 3600);
    // const minutes = Math.floor((timestamp % 3600) / 60);
    // const seconds = timestamp % 60;
    const hours = Math.floor((timestamp / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timestamp / 1000 / 60) % 60);
    const seconds = Math.floor((timestamp / 1000) % 60);

    // return `${hours}h ${minutes}m ${seconds}s`;
    return { hours, minutes, seconds };
}

export { transformStopwatchToString, formatTimestamp };
