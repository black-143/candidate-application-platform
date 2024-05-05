import React from "react";

import { Card } from "../card/card-component";

import "./card-list-styles.css";

export const CardList = ({ applications }) => {
  console.log(applications,"APPLICATIONS")
  return (
    <div className="card-list">
      {applications.map((application) => (
        <Card key={application.jobTitle} job={application} />
      ))}
    </div>
  );
};

// The CardList Component is to render a list of cards component
