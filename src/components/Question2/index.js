import React, { useState } from "react";
import { line1, line2 } from "./data";

const solution = ({ maxWeight, maxPeople, line }) => {
  let totalPeople = 0;
  let totalWeight = 0;
  let trips = [];
  let peopleInElevator = [];

  for (let i = 0; i < line.length; i++) {
    const person = line[i];
    const weight = person.weight;

    // Add people to elevator until max weight or people reached
    if (totalPeople < maxPeople && totalWeight + weight <= maxWeight) {
      peopleInElevator.push(person);
      totalPeople += 1;
      totalWeight += weight;
    } else {
      // If max reached, complete the trip then empty the elevator
      trips.push([...peopleInElevator]);
      peopleInElevator.length = 0;
      totalPeople = 0;
      totalWeight = 0;

      // Add remaining people after emptying the elevator
      if (totalWeight + weight < maxWeight) {
        peopleInElevator.push(person);
        totalPeople += 1;
        totalWeight += weight;
      }
    }
  }

  // If there were any last passengers, add them to the trip
  if (peopleInElevator.length) {
    trips.push([...peopleInElevator]);
  }

  return trips;
};

const Answer2 = () => {
  const [line, setLine] = useState(1);
  const _line = line === 1 ? line1 : line2;

  const answer = solution(_line);

  return (
    <div>
      <p>Which line do you want to use?</p>
      <button onClick={() => setLine(1)}>Line 1</button>
      <button onClick={() => setLine(2)}>Line 2</button>

      <p>Using Line {line}</p>
      <p>There are {_line.line.length} people in queue</p>
      <p>The total allowed passengers are {_line.maxPeople}</p>
      <p>The total allowed weight is {_line.maxWeight}</p>

      <hr />

      <p>SOLUTION</p>
      <p>
        For the {_line.line.length} people, there were a total of{" "}
        {answer.length} trips
      </p>

      <div>
        {answer.map((ans, i) => (
          <div key={i}>
            <p>
              Trip {i + 1} - people: {ans.length}, weight:{" "}
              {ans.reduce((acc, item) => (acc += item.weight), 0)}
            </p>

            <ul>
              {ans.sort((a, b) => a.floor - b.floor).map((person, j) => (
                <li key={`${i}${j}`}>
                  Person {j + 1} of weight {person.weight} to floor{" "}
                  {person.floor}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answer2;
