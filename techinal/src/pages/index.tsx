import React from "react";
import { Header } from "@/components/header";
import Card from "@/components/card";
import { useVacation } from "@/contexts/vacationContexts";
import { ModalCreate } from "@/components/modalCreate";

export default function Home() {
  const { isModalOpen, setIsModalOpen, vacations } = useVacation();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section>
          <button onClick={openModal}>Criar +</button>
          {vacations.map((vacation) => (
            <Card key={vacation.id} vacation={vacation} />
          ))}
        </section>

        <ModalCreate isOpen={isModalOpen} closeModal={closeModal}></ModalCreate>
      </main>
    </>
  );
}
