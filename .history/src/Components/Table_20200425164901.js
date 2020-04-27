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
            <tr key={props.log_id}>
              <td>{props.asleep}</td>
              <td>{props.awake}</td>
            </tr>
          
        </tbody>
      </table>
    );
  }