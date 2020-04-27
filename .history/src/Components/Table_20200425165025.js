import React from 'react'

export default function ProductTable(props) {
    return (
      <table>
        <caption>Our products</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>In Stock</th>
          </tr>
        </thead>
        <tbody>
          {props.logs.map(log => (
            <tr key={log.log_id}>
              <td>{log.asleep}</td>
              <td>{log.awake}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }