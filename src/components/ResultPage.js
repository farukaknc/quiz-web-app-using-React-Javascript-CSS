import React from "react";

const ResultPage = props => (
    <div className="quiz-done">
        <div
            className="message"
            style={{ color: 'green' }}
        >{props.isTimeUp ?
            (
                <div>
                    <h2>Time is up!</h2>
                    <div>Your score is {props.score.reduce(function (a, b) { return a + b === '' ? 0 : a + b })}/{props.totalscore}</div>
                </div>
            )
            : (<div>Your score is {props.score.reduce(function (a, b) { return a + b === '' ? 0 : a + b })}/{props.totalscore}</div>)
            }

        </div>
    </div>
);

export default ResultPage;