import { v4 as uuidv4 } from 'uuid';

type Vacation = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: string[];
};

const vacationData: Vacation[] = [
  {
    id: uuidv4(),
    title: 'Férias de Verão',
    description: 'Descanso na praia',
    date: '2024-07-15',
    location: 'Praia Paradisíaca',
    participants: ['João', 'Maria', 'Carlos'],
  },
  {
    id: uuidv4(),
    title: 'Retiro nas Montanhas',
    description: 'Exploração e caminhadas',
    date: '2024-08-22',
    location: 'Montanhas Serenas',
    participants: ['Ana', 'Pedro', 'Mariana'],
  },
];

export default vacationData;