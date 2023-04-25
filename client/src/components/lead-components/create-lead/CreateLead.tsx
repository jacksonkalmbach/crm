import React, { useState, useEffect } from "react";

import "./CreateLead.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { setShowCreateLead } from "../../../store/reducers/leads/showLeadSlice";
import LeadRowStatus from "../lead-list-components/lead-row-status/LeadRowStatus";
import SearchBox from "../../search-box-component/SearchBox";

import socket from "../../../utils/socket";

const defaultCreateLeadState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  leadStatus: "",
  leadOwner: "",
};

const CreateLead = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultCreateLeadState);
  const { leadStatus } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultCreateLeadState);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleLeadStatusChange = (status: string): void => {
    setFormFields({ ...formFields, leadStatus: status });
  };

  const showCreateLead = useSelector((state: any) => state.showLead.value);

  const handleCloseCreateLead = () => {
    dispatch(setShowCreateLead(false));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const body = { ...formFields };
      const response = fetch("http://localhost:5001/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);

      await resetFormFields();
      dispatch(setShowCreateLead(false));
      socket.emit("new-lead", body);
      console.log("EMITTED NEW LEAD", body);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showCreateLead && (
        <>
          <div className={showCreateLead ? "overlay" : ""}></div>
          <div className={"create-lead-container"}>
            <div className="create-lead-header">
              <h1>Create Lead </h1>
              <div
                className="close-create-lead-button"
                onClick={handleCloseCreateLead}
              >
                Close
                <span className="material-symbols-outlined">close</span>
              </div>
            </div>
            <form className="create-lead-form" onSubmit={handleSubmit}>
              <div className="lead-name">
                <div className="form-group">
                  First Name
                  <input
                    className="first-name-input"
                    required
                    type="text"
                    id="firstName-input"
                    name="firstName"
                    placeholder="e.g. John"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  Last Name
                  <input
                    className="last-name-input"
                    required
                    type="text"
                    id="lastName-input"
                    name="lastName"
                    placeholder="e.g. Doe"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                Email
                <input
                  type="email"
                  id="email-input"
                  name="email"
                  placeholder="e.g. mail@example.com"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                Phone
                <input
                  type="tel"
                  id="phone-input"
                  name="phone"
                  maxLength={10}
                  placeholder="Enter Number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                Company
                <input
                  type="text"
                  id="company-input"
                  name="company"
                  placeholder="e.g. Google"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                Job Title
                <input
                  type="text"
                  id="jobTitle-input"
                  name="jobTitle"
                  placeholder="e.g. Project Manager"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                Lead Owner
                <input
                  type="text"
                  id="leadOwner-input"
                  name="leadOwner"
                  placeholder="e.g. 1"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                Lead Status
                <div className="lead-progress">
                  <LeadRowStatus
                    status="New"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("New")}
                    selected={leadStatus === "New" ? true : false}
                  />
                  <LeadRowStatus
                    status="Open"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("Open")}
                    selected={leadStatus === "Open" ? true : false}
                  />
                  <LeadRowStatus
                    status="Warm"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("Warm")}
                    selected={leadStatus === "Warm" ? true : false}
                  />
                  <LeadRowStatus
                    status="In Progress"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("In Progress")}
                    selected={leadStatus === "In Progress" ? true : false}
                  />
                  <LeadRowStatus
                    status="Closed"
                    clickable={true}
                    onClick={() => handleLeadStatusChange("Closed")}
                    selected={leadStatus === "Closed" ? true : false}
                  />
                </div>
              </div>
              <div className="create-lead-button-container">
                <button className="create-lead-and-another-button">
                  Create and Add another
                </button>
                <button className="create-lead-button" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default CreateLead;
