// components/card/card-component.js

import React, { useState } from "react";
import "./card-styles.css";

export const Card = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedJobDetails = job.jobDetailsFromCompany.substring(0, 100);
  const jobDetails = isExpanded ? job.jobDetailsFromCompany : `${truncatedJobDetails}...`;

  const toggleViewMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card">
      <header className="card-header">
        <div className="card-company-logo">
          <img src={job.logoUrl} alt={job.companyName} />
        </div>
        <div className="card-company-info">
          <h2>{job.jobRole} Engineer</h2>
          <p>{job.companyName}</p>
          <p>{job.location}</p>
        </div>
      </header>
      <section className="card-body">
        <p className="estimated-salary">
          Estimated Salary: ₹{job.minJdSalary ? job.minJdSalary : 0} - {job.maxJdSalary} LPA ✅
        </p>
        <p>{jobDetails}</p>
        {job.jobDetailsFromCompany.length > 100 && (
          <button className="apply-link" onClick={toggleViewMore}>
            {isExpanded ? "View Less" : "View More"}
          </button>
        )}
        <p>Minimum Experience: {job.minExp ? job.minExp : 0} years</p>
      </section>
      <footer className="card-footer">
        <div className="card-buttons">
          <button className="easy-apply-button">🪄 Easy Apply</button>
          <button className="referral-asks-button">🔓 Unlock referral asks</button>
        </div>
      </footer>
    </div>
  );
};
