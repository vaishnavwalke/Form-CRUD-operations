import React from "react";
import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/Ci";
import axios from "axios";
// import Moment from "react-moment";
import { format, parseISO } from "date-fns";

export const Form = () => {
  const [formData, setFormData] = useState({
    id: "1",
    FirstName: "",
    LastName: "",
    DOB: "",
    Study: "BE",
    StartDate: "",
    EndDate: "",
    CurrentSalary: "",
    Description: "",
  });
  //const [date, setDate] = useState();

  const handleDateChange = (dob) => {
    const formattedDOBt = dob.toISOString();
    console.log(formattedDOBt);
    const date = formattedDOBt.slice(0, 10);
    console.log(date);
    setFormData({
      ...formData,
      DOB: date,
    });
  };

  const handleStartChange = (startdate) => {
    const newsd = startdate.toISOString();
    const start = newsd.slice(0, 10);
    setFormData({ ...formData, StartDate: start });
  };
  const handleEndChange = (enddate) => {
    const endd = enddate.toISOString();
    const end = endd.slice(0, 10);
    setFormData({ ...formData, EndDate: end });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleStudyChange = (e) => {
    const selectedStudy = e.target.value;
    setFormData({
      ...formData,
      Study: selectedStudy,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const randomID = Math.floor(Math.random() * (200 - 100 + 1)) + 100;

    const formattedDOB = parseISO(formData.DOB).toISOString();
    //parseISO("2023-09-11T18:30:00.000Z").toISOString();

    const formattedStartDate = format(
      parseISO(formData.StartDate),
      "yyyy-MM-dd"
    );
    const formattedEndDate = format(parseISO(formData.EndDate), "yyyy-MM-dd");
    console.log("Date of Birth:", formData.DOB);

    setFormData({
      ...formData,
      id: randomID,
      DOB: formattedDOB,
      StartDate: formattedStartDate,
      EndDate: formattedEndDate,
    });

    console.log(formData);
    // Handle form submission logic here
    try {
      const response = await axios.post(
        "https://sweede.app/DeliveryBoy/Add-Employee/",
        formData
      );
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <Formdetails>
      <form onSubmit={handleSubmit}>
        <div className="Names">
          <div>
            <label htmlFor="firstname">First Name*</label>
            <br />
            <input
              type="text"
              id="firstname"
              name="FirstName"
              placeholder="Enter your name"
              value={formData.FirstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name*</label>
            <br />
            <input
              type="lastname"
              id="lastname"
              name="LastName"
              placeholder="Enter your name"
              value={formData.LastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="dob">
          <label htmlFor="dob">Date of Birth:</label>
          <br />

          <DatePicker
            className="datepicker"
            id="dob"
            name="DOB"
            selected={formData.DOB}
            onChange={handleDateChange}
            dateFormat="dd-MM-yy" // You can customize the date format
            placeholderText="Select DOB"
          />
          <CiCalendar className="icon" />
        </div>
        <div className="dropdownStudy">
          <label htmlFor="dropdown">Study:</label>
          <br />
          <select
            id="study"
            name="Study"
            value={formData.Study}
            onChange={handleStudyChange}
          >
            <option value="BE">BE</option>
            <option value="B-tech">B-tech</option>
            <option value="M-tech">M-tech</option>
          </select>
        </div>
        <div className="startEnd">
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <br />
            <DatePicker
              id="startDate"
              name="StartDate"
              selected={formData.StartDate}
              onChange={handleStartChange}
              dateFormat="dd-MM-yy" // Customize the date format
              placeholderText="Select Start Date"
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date:</label>
            <br />
            <DatePicker
              id="endDate"
              name="EndDate"
              selected={formData.EndDate}
              onChange={handleEndChange}
              dateFormat="dd-MM-yy" // Customize the date format
              placeholderText="Select End Date"
            />
          </div>
        </div>
        <div className="salary">
          <label htmlFor="salary">Current Salary</label>
          <input
            type="salary"
            id="salary"
            name="CurrentSalary"
            placeholder="30000"
            value={formData.CurrentSalary}
            onChange={handleChange}
          />
        </div>
        <div className="description">
          <label htmlFor="description">Description</label>

          <textarea
            //defaultValue="I really enjoyed biking yesterday!"
            rows={4}
            cols={40}
            type="description"
            id="description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </div>
        <button className="cancel" type="cancel">
          Cancel
        </button>
        <button className="save" type="submit">
          Save
        </button>
      </form>
    </Formdetails>
  );
};

const Formdetails = styled.div`
  border-radius: 35px;
  background: #fff;
  box-shadow: 0px 4px 19px 0px rgba(210, 209, 209, 0.25);
  width: 1053px;
  height: 1624px;
  flex-shrink: 0;
  justify-content: center;
  margin: 0 auto;
  align-items: center;

  background-color: lightgreen;
  padding-left: 211px;
  padding-right: 183px;
  padding-top: 163px;
  padding-bottom: 172px;
  .Names {
    display: flex;
    gap: 50px;
    margin-bottom: 19px;
    //background-color: red;
    input {
      width: 308px;
      height: 54px;
      color: var(--Grey_03, #7e98ba);
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%;
      letter-spacing: 0.13px;
      background: #f8fbff;
      border-radius: 16px;
      padding-left: 24px;
      padding-top: 18px;
      padding-bottom: 18px;
      margin-top: 19px;
      border: none;
    }
  }

  .dob {
    label {
    }
  }
  .datepicker {
    display: flex;
    border-radius: 16px;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 659px;
    height: 54px;
    flex-shrink: 0;
    padding: 5px;
    //flex-grow: 1;
    border: none;
    border-radius: 16px;
    outline: none;
    flex: 1;
    //background: transparent;
    background: #f8fbff;
    gap: 289px;
    margin-bottom: 19px;
    margin-top: 19px;
    //background-color: red;

    DatePicker {
      width: 308px;
      height: 54px;
      color: var(--Grey_03, #7e98ba);
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 18.2px */
      letter-spacing: 0.13px;
      background: #f8fbff;
      border-radius: 16px;
      padding-left: 24px;
      padding-top: 18px;
      padding-bottom: 18px;
      margin-top: 19px;
      border: none;
    }
    // background-color: red;
  }
  .icon {
    margin-left: -20px; /* Adjust the icon's position to fit inside the input field */
    cursor: pointer;
  }

  .dropdownStudy {
    flex: 1;
    /* width: 659px;
    height: 54px; */
    border-radius: 4px;
    margin: 0 auto;
    display: flex;
    //margin-bottom: 19px;
    //background-color: red;
    label {
      width: 39px;
      height: 18px;
    }
    select {
      width: 659px;
      height: 54px;
      color: var(--Grey_03, #7e98ba);
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 18.2px */
      letter-spacing: 0.13px;
      background: #f8fbff;
      border-radius: 16px;
      padding-left: 24px;
      padding-top: 18px;
      padding-bottom: 18px;
      margin-top: 19px;
      border: none;
      margin-bottom: 19px;
    }
  }

  .startEnd {
    display: flex;
    gap: 50px;
    margin-bottom: 19px;
    //background-color: red;

    input {
      width: 308px;
      height: 54px;
      color: var(--Grey_03, #7e98ba);
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 18.2px */
      letter-spacing: 0.13px;
      background: #f8fbff;
      border-radius: 16px;
      padding-left: 24px;
      padding-top: 18px;
      padding-bottom: 18px;
      margin-top: 19px;
      border: none;
    }
  }

  .salary {
    display: flex;

    margin-bottom: 19px;
    //background-color: red;

    input {
      width: 659px;
      height: 54px;
      color: var(--Grey_03, #7e98ba);
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 18.2px */
      letter-spacing: 0.13px;
      background: #f8fbff;
      border-radius: 16px;
      padding-left: 24px;
      padding-top: 18px;
      padding-bottom: 18px;
      margin-top: 19px;
      border: none;
    }
  }
  .description {
    display: flex;

    margin-bottom: 19px;
    //background-color: red;

    textarea {
      width: 308px;
      height: 54px;
      color: var(--Grey_03, #7e98ba);
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 18.2px */
      letter-spacing: 0.13px;
      background: #f8fbff;
      border-radius: 16px;
      padding-left: 24px;
      padding-top: 18px;
      padding-bottom: 18px;
      margin-top: 19px;
      border: none;
    }
  }

  .cancel {
    border-radius: 13px;
    background: #e3e3e3;
    width: 297px;
    height: 69px;
    flex-shrink: 0;
    margin-right: 59px;
  }
  .save {
    border-radius: 13px;
    border: 2px solid #142a51;
    background: #fff;
    width: 297px;
    height: 69px;
    flex-shrink: 0;
  }
`;

const commonForInputs = styled.div`
  margin-bottom: 19px;
  width: 308px;
  height: 54px;
  color: var(--Grey_03, #7e98ba);
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 18.2px */
  letter-spacing: 0.13px;
  background: #f8fbff;
  border-radius: 16px;
  padding-left: 24px;
  padding-top: 18px;
  padding-bottom: 18px;
  margin-top: 19px;
  border: none;
  gap: 289px;
`;
