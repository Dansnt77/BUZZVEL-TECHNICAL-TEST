import { Vacation, VacationCreateSchema } from "@/schemas/create.schema";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import api from "@/api/api";

interface VacationProviderData {
  vacations: Vacation[];
  setVacations: Dispatch<SetStateAction<Vacation[]>>;
  selectedVacation: Vacation | null;
  createVacation: (data: z.input<typeof VacationCreateSchema>) => void;
  updateVacation: (
    id: string,
    data: z.input<typeof VacationCreateSchema>
  ) => void;
  deleteVacation: (id: string) => void;
  selectVacation: (id: string) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  readVacation: (id: string) => void;
}

export type Participant = {
  name: string;
};

export type TypeVacation = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: Participant[];
};

const VacationContext = createContext<VacationProviderData>(
  {} as VacationProviderData
);

export const VacationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  const createVacation = (data: z.input<typeof VacationCreateSchema>): void => {
    api
      .post("/vacations", data)
      .then((res: any) => {
        setVacations(res.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const updateVacation = (
    id: string,
    data: z.input<typeof VacationCreateSchema>
  ): void => {
    setVacations((prevVacations) =>
      prevVacations.map((vacation) =>
        vacation.id === id ? { ...data, id } : vacation
      )
    );
  };

  const deleteVacation = (id: string): void => {
    setVacations((prevVacations) =>
      prevVacations.filter((vacation) => vacation.id !== id)
    );
  };

  const selectVacation = (id: string): void => {
    const foundVacation =
      vacations.find((vacation) => vacation.id === id) || null;
    setSelectedVacation(foundVacation);
  };

  const readVacation = (id: string): void => {
    api.get("vacations").then((res) => {
      setVacations(res.data);
    });
  };

  return (
    <VacationContext.Provider
      value={{
        vacations,
        setVacations,
        selectedVacation,
        createVacation,
        updateVacation,
        deleteVacation,
        selectVacation,
        isModalOpen,
        setIsModalOpen,
        readVacation,
      }}
    >
      {" "}
      {children}{" "}
    </VacationContext.Provider>
  );
};

export const useVacation = (): VacationProviderData =>
  useContext(VacationContext);
