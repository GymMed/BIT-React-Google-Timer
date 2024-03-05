import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { PAGES_ENUM } from "../../../utils/pagesManager";

function Footer({ activeLink, runningTime, children }) {
    // const [recordTime, setRecordTime] = useState(runningTime);
    // const [savedTime, setSavedTime] = useState(new Date().getTime());
    // const [timerResult, setTimerResult] = useState(0);

    // useEffect(() => {
    //     if (activeLink.started) {
    //         const intervalId = setInterval(() => {
    //             console.log(recordTime);
    //             const currentTimestamp = new Date().getTime();
    //             if (recordTime > currentTimestamp) {
    //                 setTimerResult(recordTime - currentTimestamp);
    //             } else {
    //                 clearInterval(intervalId);
    //             }
    //         }, 10);

    //         return () => {
    //             clearInterval(intervalId);
    //         };
    //     }
    // }, [activeLink, recordTime]);

    function getActivityClasses(activity) {
        if (activity) {
            if (activeLink.started) return "border-blue-500";
            return "broder-gray-500";
        }
        return "";
    }

    return (
        <footer className="relative p-5 flex gap-5 border-t border-t-gray-300">
            <div
                className={
                    getActivityClasses(
                        activeLink.pageType === PAGES_ENUM.Timer
                    ) + ` absolute top-0 left-0 w-[${0}%}] border-t-2 h-2`
                }
            ></div>
            {children}
        </footer>
    );
}

Footer.propTypes = {
    children: PropTypes.node,
    activeLink: PropTypes.object,
    runningTime: PropTypes.number,
};

export default Footer;
