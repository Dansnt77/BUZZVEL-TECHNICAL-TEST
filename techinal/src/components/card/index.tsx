// No componente Card
import React from "react";
import { Vacation } from "@/schemas/create.schema";
import Image from "next/image";
import eye from "../../assets/Eye.svg";
import trash from "../../assets/Trash.svg";
import pen from "../../assets/Pen.svg";
import download from "../../assets/Downloading.svg";

interface CardProps {
  vacation: Vacation;
  onDownloadClick: (id: string) => void; // Adicione a propriedade para a função de download
}

const Card: React.FC<CardProps> = ({ vacation, onDownloadClick }) => {
  const { id, title, date, description, location, participants } = vacation;

  const handleDownload = () => {
    onDownloadClick(id); // Chame a função onDownloadClick passando o id do card
  };

  return (
    <section id={id} className="border p-4 m-4">
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
            <li key={index}>{participant.name}</li>
          ))}
        </ul>
        <div className="flex">
          <Image src={eye} alt="olho" />
          <Image src={trash} alt="lixeira" />
          <Image src={pen} alt="caneta" />
          <Image src={download} alt="download" onClick={handleDownload} />
        </div>
      </div>
    </section>
  );
};

export default Card;
