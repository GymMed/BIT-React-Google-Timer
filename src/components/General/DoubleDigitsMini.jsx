import Proptypes from "prop-types";

export default function DoubleDigitsMini({ digits }) {
    return (
        <div className="min-w">
            <span className="text-4xl">{digits === 0 ? "00" : digits}</span>
        </div>
    );
}

DoubleDigitsMini.propTypes = {
    digits: Proptypes.number,
};
