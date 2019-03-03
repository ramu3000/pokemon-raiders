import React from "react";

import { isPast, isFuture } from "../utils/dateFormatting";

import RaidCard from "./common/RaidCard";

export const RaidList = ({ raids, raidStatus }) => {
  if (raids.length === 0) {
    return null;
  }

  //Remove gyms from list, add distance to raid location
  let raidPool = [];

  const gymsWithHasRaids = raids.map(function(raid) {
    return {
      id: raid.id,
      name: raid.gymName,
      distance: raid.distance,
      level: raid.level,
      boss: raid.boss,
      players: raid.playerQue,
      endTime: raid.endTime,
      startTime: raid.startTime,
      comments: raid.comments,
      coords: {
        latitude: raid.coords.latitude,
        longitude: raid.coords.longitude
      }
    };
  });
  raidPool = filterRaidListByRaidStatus(gymsWithHasRaids, raidStatus);

  return (
    <ul>
      {raidPool.map(function(gymRaid, i) {
        if (!gymRaid) {
          return null;
        }

        return (
          <RaidCard
            key={gymRaid.id}
            id={gymRaid.id}
            distance={gymRaid.distance}
            name={gymRaid.name}
            level={gymRaid.level}
            players={gymRaid.players}
            boss={gymRaid.boss}
            endTime={gymRaid.endTime}
            startTime={gymRaid.startTime}
            comments={gymRaid.comments}
          />
        );
      })}
    </ul>
  );
};

const filterRaidListByRaidStatus = (gyms, raidstatus) => {
  switch (raidstatus) {
    case "current":
      return gyms.filter(
        raid => isPast(raid.startTime) && isFuture(raid.endTime)
      );
    case "incoming":
      return gyms
        .filter(raid => isFuture(raid.startTime))
        .sort(
          ({ startTime }, { startTime: startTime2 }) => startTime > startTime2
        );
    case "ended":
      return gyms.filter(raid => isPast(raid.endTime));
    default:
      return [...gyms];
  }
};
