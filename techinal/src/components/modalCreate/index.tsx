import {
  TypeVacation,
  Participant,
  useVacation,
} from "@/contexts/vacationContexts";
import { Input } from "../inputs";

import { useForm } from "react-hook-form";

function formatDate(date: string | undefined) {
  if (!date || date === "undefined") return ""; // Retorna uma string vazia se a data for undefined ou "undefined"

  // Verifica se a data tem o formato esperado (DDMMAAAA)
  if (date.length !== 8) return ""; // Retorna uma string vazia se a data não estiver no formato esperado

  // Extrai os componentes da data
  const day = date.substring(0, 2);
  const month = date.substring(2, 4);
  const year = date.substring(4, 8);

  // Retorna a data no formato "DD/MM/AAAA"
  return `${day}/${month}/${year}`;
}
interface ModalCreateProps {
  closeModal: () => void;
  isOpen: boolean;
}

export const ModalCreate = ({ closeModal, isOpen }: ModalCreateProps) => {
  const { setVacations, createVacation } = useVacation();

  const { register, handleSubmit, setValue } = useForm<TypeVacation>({});

  const formSubmit = (formData: TypeVacation) => {
    // Remover vírgulas dos nomes dos participantes
    const participantsWithoutComma = formData.participants.map(
      (participant) => ({
        name: participant.name.replace(",", "").trim(),
      })
    );

    // Formatar a data antes de enviar para o back-end
    const formattedDate = formatDate(formData.date);

    const updatedFormData: TypeVacation = {
      ...formData,
      participants: participantsWithoutComma,
      date: formattedDate,
    };
    createVacation(updatedFormData);
    console.log("chegou aqui");
  };

  return (
    <>
      <dialog
        open={isOpen}
        className="h-2/3 w-1/2 bg-white p-6 rounded-md shadow-md"
      >
        <section>
          <button onClick={closeModal}>x</button>
          <form action="" onSubmit={handleSubmit(formSubmit)}>
            <Input
              label="Titulo"
              placeholder="Digite o seu Titulo"
              {...register("title")}
            />
            <Input
              label="Descrição"
              placeholder="Digite sua descrição"
              {...register("description")}
            />
            <Input
              label="Localização"
              placeholder="Digite sua Localização"
              {...register("location")}
            />
            <Input
              label="Participantes"
              placeholder="Digite seus Participantes"
              onChange={(e) => {
                const names = e.target.value.split(",");
                const participants = names.map((name) => ({
                  name: name.trim(),
                }));
                setValue("participants", participants);
              }}
            />

            <Input
              label="Data"
              placeholder="DD/MM/AAAA"
              {...register("date")}
            />
            <button type="submit">Criar</button>
          </form>
        </section>
      </dialog>
    </>
  );
};
