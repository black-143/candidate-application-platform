import React, { useState, useEffect } from "react";
import { CardList } from "./components/card-list/card-list-component";
import { Filters } from "./components/filters/filters-components";
import "./styles.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    minExp: "",
    companyName: "",
    location: "",
    jobRole: "",
    minJdSalary: "",
  });

  const fetchJobData = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: (page - 1) * 10, // Adjust offset based on page number
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const result = await response.json();
      setApplications((prevApplications) => [...prevApplications, ...(result.jdList || [])]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchJobData();
  }, [page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const filteredApplications = applications.filter((app) => {
    const meetsExperienceCriteria =
    filters.minExp === "" || (app.minExp && parseInt(app.minExp) >= parseInt(filters.minExp));

    const meetsCompanyNameCriteria =
      filters.companyName === "" || app.companyName.toLowerCase().includes(filters.companyName.toLowerCase());

    const meetsLocationCriteria =
      filters.location === "" || app.location.toLowerCase().includes(filters.location.toLowerCase());

    const meetsJobRoleCriteria = filters.jobRole === "" || app.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase());

    const meetsMinBasePayCriteria =
      filters.minJdSalary === "" || app.minJdSalary >= parseInt(filters.minJdSalary);

    return (
      meetsExperienceCriteria &&
      meetsCompanyNameCriteria &&
      meetsLocationCriteria &&
      meetsJobRoleCriteria &&
      meetsMinBasePayCriteria
    );
  });

  return (
    <div className="App">
      <h1>Candidate Application Platform</h1>
      <Filters handleFilterChange={handleFilterChange} filters={filters} />
      {filteredApplications.length > 0 ? (
        <CardList applications={filteredApplications} />
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <p>No job listings found.</p>
      )}
    </div>
  );
};

export default App;
