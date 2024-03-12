import React from 'react';
import { Header } from '@/components/header';
import vacationData from '@/data/vacationData';
import Card from '@/components/card';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section>
          {vacationData.map((vacation) => (
            <Card key={vacation.id} vacation={vacation} />
          ))}
        </section>
      </main>
    </>
  );
}
