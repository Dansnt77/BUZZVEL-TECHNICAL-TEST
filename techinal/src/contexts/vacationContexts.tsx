import { Vacation, VacationCreateSchema } from "@/schemas/create.schema";
import { createContext, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid"

interface VacationProviderData{
    vacations: Vacation[];
    selectedVacation: Vacation | null;
    createVacation: (data: z.input<typeof VacationCreateSchema>) => void;
    updateVacation: (id: string, data: z.input<typeof VacationCreateSchema>) => void;
    deleteVacation: (id: string) => void;
    selectVacation: (id: string) => void;
}

const VacationContext = createContext<VacationProviderData>({} as VacationProviderData)

export const VacationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);

    useEffect(()=> {

    }, [])

    const createVacation = (data: z.input<typeof VacationCreateSchema>): void => {
        const newVacation: Vacation = {
            ...data,
            id: uuidv4()
        }
        setVacations((prevVacations) => [...prevVacations, newVacation])
    }

    const updateVacation = (id: string, data: z.input<typeof VacationCreateSchema>): void => {
        setVacations((prevVacations) => prevVacations.map((vacation) => vacation.id === id ? {...data, id} : vacation))
    }

    const deleteVacation = (id: string): void => {
        setVacations((prevVacations) => prevVacations.filter((vacation) => vacation.id !== id))
    }

    const selectVacation = (id: string): void => {
        const foundVacation = vacations.find((vacation) => vacation.id === id) || null
        setSelectedVacation(foundVacation)
    }

    return(<VacationContext.Provider
        value={{
          vacations,
          selectedVacation,
          createVacation,
          updateVacation,
          deleteVacation,
          selectVacation,
        }}> {children} </VacationContext.Provider>)
}

export const useVacation = (): VacationProviderData => useContext(VacationContext)

