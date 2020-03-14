import React, { Component, useState, useEffect } from "react";
/* Declare new Header variable for generating new Headers from 
the data
*/
let newHeader = [];

/* Generate function 
@Params  -> data[]
return -> [new Set with headers]
*/

function generateHeader(users) {
  if (users && users.length > 1) {
    let headerValues = Object.keys(users[0]);
    let headerLabels = headerValues.map(i => {
      i = i.charAt(0).toUpperCase() + i.slice(1);
      return i.replace("_", " ");
    });
    for (let i = 0; i < headerLabels.length; i++) {
      newHeader.push({ label: headerLabels[i], value: headerValues[i] });
    }

    return [...new Set(newHeader)];
  }
}
const Tables = ({ users, sortTable }) => {
  const [headers, setHeaders] = useState();
  useEffect(() => {
    if (!(newHeader.length > 1)) {
      setHeaders(generateHeader(users));
    }
  });
  return (
    <table>
      <thead>
        <tr>
          {headers &&
            headers.map(title => (
              <th key={title.value} onClick={() => sortTable(title.value)}>
                {title.label}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {users.length > 0 &&
          users.map((user, i) => (
            <tr key={i}>
              {headers && headers.length > 0 && headers.map((h,idx) => (
                <td key={idx}>{user[h.value]}</td>
              ))}
              {/* <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.company_name}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.zip}</td>
              <td>{user.email}</td>
              <td>{user.web}</td>
              <td>{user.age}</td> */}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Tables;
