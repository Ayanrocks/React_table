import React, { Component, useState } from "react";

const intialHeader = [
  {
    value: "first_name",
    label: "First Name"
  },
  {
    value: "last_name",
    label: "Last Name"
  },
  {
    value: "company_name",
    label: "Company Name"
  },
  {
    value: "state",
    label: "State"
  },
  {
    value: "zip",
    label: "Zip"
  },
  {
    value: "email",
    label: "Email"
  },
  {
    value: "web",
    label: "Web"
  },
  {
    value: "age",
    label: "Age"
  }
];

const Tables = ({ users }) => {
  const [headers] = useState(intialHeader);
  return (
    <table>
      <thead>
        <tr>
          {headers &&
            headers.map(title => <th key={title.value}>{title.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {users.length > 0 &&
          users.map(user => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.company_name}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.zip}</td>
              <td>{user.email}</td>
              <td>{user.web}</td>
              <td>{user.weageb}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Tables;
