import React from 'react'
import './Table.scss'

export default class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logs: []
        }
    }
 render() {
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
          {this.state.logs.map(log => (
              <tr key={log.log_id}>
              <td>{log.asleep}</td>
              <td>{log.awake}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}
  }