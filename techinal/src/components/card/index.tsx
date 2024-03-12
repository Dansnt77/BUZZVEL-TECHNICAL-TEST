import React from "react";
import { Vacation } from "@/schemas/create.schema";

interface CardProps {
    vacation: Vacation;
  }

  const Card: React.FC<CardProps> = ({ vacation }) => {
    const { title, date, description, location, participants } = vacation;
  
    return (
      <section className="border p-4 m-4">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p>{date}</p>
        </div>
  
        <div className="mt-2">
          <h4 className="font-bold">Description:</h4>
          <p>{description}</p>
  
          <h4 className="font-bold mt-2">Location:</h4>
          <p>{location}</p>
  
          <h4 className="font-bold mt-2">Participants:</h4>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  };
  
  export default Card;