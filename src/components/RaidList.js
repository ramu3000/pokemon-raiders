import React from "react";

import { isPast, isFuture } from "../utils/dateFormatting";

import RaidCard from "./common/RaidCard";

export const RaidList = ({ gyms, raids, raidStatus }) => {
  if (gyms.length === 0 || raids.length === 0) {
    return null;
  }

  let raidPool = [];
  if (gyms.length === 0) return;
  const gymsWithHasRaids = raids.map(function(raid) {
    const gym = gyms.find(gym => gym.id === raid.gym);
    if (!gym) return null;
    return {
      id: raid.id,
      name: gym.name,
      distance: gym.distance,
      level: raid.level,
      boss: raid.boss,
      players: raid.playerQue,
      endTime: raid.endTime,
      startTime: raid.startTime,
      coords: {
        latitude: gym.coords.latitude,
        longitude: gym.coords.longitude
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
            distance={gymRaid.distance}
            name={gymRaid.name}
            level={gymRaid.level}
            players={gymRaid.players}
            boss={gymRaid.boss}
            endTime={gymRaid.endTime}
            startTime={gymRaid.startTime}
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
