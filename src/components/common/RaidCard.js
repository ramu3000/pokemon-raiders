import React from "react";
import Countdown from "react-countdown-now";

import { formatTimesSTamp, isFuture } from "../../utils/dateFormatting";
import raidImage from "../../assets/images/raid.jpg";

const card = ({ name, distance, level, players, boss, endTime, startTime }) => {
  if (!name) {
    //todo proptypes
    return <li>wrong raid info</li>;
  }
  const raidLastInMinutes = (startTime, endTime) => {
    if (isFuture(startTime)) {
      return `starts in ${formatTimesSTamp(startTime)}`;
    }
    const Ending = () => `Ended ${formatTimesSTamp(endTime)}`;
    return (
      <div>
        <Countdown
          date={endTime}
          renderer={({ minutes, seconds, completed }) => {
            if (completed) {
              return <Ending />;
            } else {
              return (
                <span>
                  <i className="fas fa-clock" />
                  {minutes}:{seconds}
                </span>
              );
            }
          }}
        >
          <Ending />
        </Countdown>
      </div>
    );
  };

  return (
    <li className="gym-card__item">
      <div className="raid-strength">
        <div className="raid-logo">
          <img src={raidImage} alt="upcoming raid" />
        </div>
        <div className="raid-proximity-timer-wrapper">
          <div className="raid-proximity">
            <i className="fas fa-map-marker-alt" /> {distance} meters{" "}
          </div>

          <div className="raid-timers">
            {raidLastInMinutes(startTime, endTime)}
          </div>
        </div>
      </div>
      <div className="raid-info__wrapper">
        <div className="raid-info-basic">
          <p className="raid-gym-name">Gym name: {name || "betoniporsaat"} </p>

          <p className="raid-people-rating">
            {boss || "boss not known"} <br />
            level: {level || 0}{" "}
          </p>
        </div>
        <div>
          <p>
            There is <b>{players || 0}</b> people waiting
          </p>
        </div>
      </div>

      <button className="gym-btn-more-info">More info</button>
    </li>
  );
};

export default card;
