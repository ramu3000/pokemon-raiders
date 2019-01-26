import React from "react";

const GymCard = props => {
  const { name, id, step } = props;
  return (
    <li className="gymcard">
      <header className="gymcard-header">
        <div className="gym-image">
          <img alt="gym logo" src="https://placehold.it/50/50" />
        </div>
        <p>{name}</p>
      </header>
      <div className="content">
        <p>
          Matka gymille <b>{props.distance}m</b>
        </p>
      </div>
      <footer className="card-footer">
        <a
          href="javascript:void(0)"
          onClick={step}
          className="card-footer-item"
          data-id={id}
        >
          Valitse
        </a>
        <a href="#" className="card-footer-item">
          Katso kartalta
        </a>
      </footer>
    </li>
  );
};
export default GymCard;
