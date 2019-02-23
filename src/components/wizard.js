import React from "react";

import "./wizard.css";

export const WizardPageFiveChooseRaidBoss = props => {
  const { bossPool, saveRaid } = props;
  return (
    <div>
      <h2>What is the RaidBoss</h2>
      <ul>
        <li>Pikachu</li>
        <li>Heatron</li>
        <li>Snorlax</li>
        <li>Magikarp</li>
      </ul>
      <button className="green" onClick={saveRaid}>
        Save raid and exit
      </button>
      <button className="green" onClick={saveRaid}>
        Save raid and ask help
      </button>
    </div>
  );
};
