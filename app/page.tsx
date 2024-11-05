"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AluraQuizLogo } from "./components/AluraQuizLogo";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";
import { Modal } from "./components/Modal";
import pageStyles from "./page.module.css";

export default function Page() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (playerName.trim()) {
      router.push(`/game?player=${playerName}`);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <main className={pageStyles.screen} style={{ flex: 1 }}>
      <section className={pageStyles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <AluraQuizLogo />
        </div>

        <Card headerTitle="Teste suas habilidades">
          <p style={{ marginBottom: "32px" }}>
            Teste os seus conhecimentos sobre o universo de Counter Strike e
            divirta-se criando o seu AluraQuiz!
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "24px" }}>
              <input
                type="text"
                placeholder="Diz aí seu nome pra jogar :)"
                name="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
            <button>Jogar</button>
          </form>

          {playerName && (
            <p style={{ marginTop: "16px", fontSize: "18px" }}>
              Olá, {playerName}! Boa sorte no quiz!
            </p>
          )}
        </Card>
        <Footer />

        {isModalOpen && (
          <Modal 
            message="Por favor, insira seu nome para jogar." 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </section>
    </main>
  );
}

