import React from "react";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


const Rules = () => {
  const goToList = () => {
    FlowRouter.go('Home');
  };

  return (
    <div>
      <h2>Game Rules</h2>
      <ol>
        <li>Each player selects a beast to battle.</li>
        <li>Take turns to attack or defend.</li>
        <li>The last beast standing wins the game.</li>
        <li>Use special abilities wisely!</li>
      </ol>
      <button onClick={goToList} className="outline-consistent">Go to List</button>
    </div>
  );
};

export default Rules;