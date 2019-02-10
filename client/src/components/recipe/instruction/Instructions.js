import React from "react";
import Instruction from "./Instruction";

export default function(props) {
  const { instructions } = props;

  return (
    <>
      <h3>Instructions</h3>
      <ul>
        {instructions.map(instruction => {
          return (
            <Instruction
              key={instruction.order}
              instruction={instruction.instruction}
            />
          );
        })}
      </ul>
    </>
  );
}
