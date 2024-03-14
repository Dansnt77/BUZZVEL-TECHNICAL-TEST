import React, { useEffect } from "react";
import { Header } from "@/components/header";
import Card from "@/components/card";
import { useVacation } from "@/contexts/vacationContexts";
import { ModalCreate } from "@/components/modalCreate";
import { PDFDocument, rgb } from "pdf-lib";
import imagem from "@/assets/Logo.png";

export default function Home() {
  const { isModalOpen, setIsModalOpen, readVacation, vacations } =
    useVacation();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    readVacation();
  }, [vacations]);

  const addImageToPDF = async (pdfBytes: string | ArrayBuffer) => {
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Carrega a imagem do diretório de assets
      const imageData = await fetch("@/assets/Logo2.png").then((res) =>
        res.arrayBuffer()
      );
      const image = await pdfDoc.embedPng(imageData);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // Calcula as coordenadas para posicionar a imagem no topo e no centro da página
      const centerX = width / 2;
      const centerY = height - 50; // ajuste conforme necessário para o topo
      const imageWidth = 100; // largura da imagem
      const imageHeight = 100; // altura da imagem

      // Adiciona a imagem à página do documento PDF
      firstPage.drawImage(image, {
        x: centerX - imageWidth / 2,
        y: centerY - imageHeight / 2,
        width: imageWidth,
        height: imageHeight,
      });

      // Salva o documento PDF com a imagem adicionada
      const pdfBytesWithImage = await pdfDoc.save();
      return pdfBytesWithImage;
    } catch (error) {
      console.error("Erro ao adicionar imagem ao PDF:", error);
      return null;
    }
  };

  const handleDownloadClick = async (id: string) => {
    try {
      const vacation = vacations.find((v) => v.id === id);
      if (!vacation) {
        console.error("Vacation não encontrada");
        return;
      }

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      page.drawText(`${vacation.title}`, {
        x: 50,
        y: 700,
        size: 24,
        color: rgb(0, 0, 0),
      });
      page.drawText(`${vacation.date}`, {
        x: 50,
        y: 650,
        size: 24,
        color: rgb(0, 0, 0),
      });
      page.drawText(`${vacation.description}`, {
        x: 50,
        y: 600,
        size: 24,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Local ${vacation.location}`, {
        x: 50,
        y: 550,
        size: 24,
        color: rgb(0, 0, 0),
      });
      page.drawText("Participantes:", {
        x: 50,
        y: 500,
        size: 24,
        color: rgb(0, 0, 0),
      });
      vacation.participants.forEach((participant, index) => {
        page.drawText(`${index + 1}. ${participant.name}`, {
          x: 70,
          y: 450 - index * 30,
          size: 18,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await addImageToPDF(await pdfDoc.save());
      if (!pdfBytes) return;

      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "vacation_info.pdf";
      link.click();
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section>
          <button onClick={openModal}>Criar +</button>
          {Array.isArray(vacations) &&
            vacations.map((vacation) => (
              <Card
                onDownloadClick={handleDownloadClick}
                key={vacation.id}
                vacation={vacation}
              />
            ))}
        </section>

        <ModalCreate isOpen={isModalOpen} closeModal={closeModal}></ModalCreate>
      </main>
    </>
  );
}
