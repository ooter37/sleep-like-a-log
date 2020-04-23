import React from "react";
import moment from 'moment'

export default class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      logs: [
        {
          log_id: 2,
          baby_id: 1,
          user_id: 12,
          asleep: "2020-04-20T16:00:00.621Z",
          awake: "2020-04-20T17:00:00.621Z",
        },
        {
          log_id: 4,
          baby_id: 1,
          user_id: 12,
          asleep: "2020-04-20T18:28:59.921Z",
          awake: "2020-04-20T18:28:59.921Z",
        },
        {
          log_id: 7,
          baby_id: 1,
          user_id: 12,
          asleep: "2020-04-21T22:38:40.000Z",
          awake: "2020-04-22T22:38:40.000Z",
        },
        {
          log_id: 16,
          baby_id: 2,
          user_id: 12,
          asleep: "2020-04-21T20:00:00.176Z",
          awake: "2020-04-21T21:00:00.176Z",
        },
        {
          log_id: 24,
          baby_id: 2,
          user_id: 12,
          asleep: "2020-04-22T19:15:59.051Z",
          awake: "2020-04-22T19:30:00.051Z",
        },
        {
          log_id: 25,
          baby_id: 3,
          user_id: 12,
          asleep: "2020-04-22T19:56:01.117Z",
          awake: "2020-04-22T20:15:00.117Z",
        },
        {
          log_id: 26,
          baby_id: 4,
          user_id: 12,
          asleep: "2020-04-22T19:56:08.333Z",
          awake: "2020-04-22T19:56:08.333Z",
        },
        {
          log_id: 28,
          baby_id: 4,
          user_id: 12,
          asleep: "2020-04-22T20:15:01.509Z",
          awake: "2020-04-22T20:15:01.509Z",
        },
      ],
    };
    this.extractor = this.extractor.bind(this)
  }
  extractor(array) {
    let splitAsleep = [];
    for (let i = 0; i < array.length; i++) {
      for (let key in array[i]) {
        if (key === "asleep") {
          splitAsleep.push([array[i][key].slice(0,10),array[i][key]]);
        }
      }
    }
    let splitAwake = [];
    for (let i = 0; i < array.length; i++) {
      for (let key in array[i]) {
        if (key === "awake") {
          splitAwake.push([array[i][key].slice(0,10),array[i][key]]);
        }
      }
    }
    var subtracted = [];
    for (let i = 0; i < splitAsleep.length; i++) {
      subtracted.push([
        splitAsleep[i][0],
        moment.utc(moment(splitAsleep,"DD/MM/YYYY HH:mm:ss").diff(moment(splitAwake,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
      ]);
    }
    // console.log(splitAsleep, splitAwake);
    console.log(subtracted)
    console.log(moment.utc(moment('2020-04-20T16:00:00.621Z',"DD/MM/YYYY HH:mm").diff(moment('2020-04-20T18:00:00.621Z',"DD/MM/YYYY HH:mm"))).format("HH:mm"))
  }
  render(){
      console.log(this.extractor(this.state.logs))
      return(
          <div>

          </div>
      )
  }
}
