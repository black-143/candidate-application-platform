import React from "react";
import "./filters-components.css";

export const Filters = ({
  handleFilterChange,
  filters: { minExp, companyName, location, jobRole, minJdSalary },
}) => {
  return (
    <div className="filters">
      <label>
        Min Experience (years):
        <input
          type="number"
          name="minExp"
          value={minExp}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Company Name:
        <input
          type="text"
          name="companyName"
          value={companyName}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Job Role:
        <input
          type="text"
          name="jobRole"
          value={jobRole}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        Min Base Pay:
        <input
          type="number"
          name="minJdSalary"
          value={minJdSalary}
          onChange={handleFilterChange}
        />
      </label>
    </div>
  );
};
