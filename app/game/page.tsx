"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AluraQuizLogo } from "../components/AluraQuizLogo";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import pageStyles from "../page.module.css";
import db from "../../db.json";
import { Alternative } from "../components/Alternative";
import { Modal } from "../components/Modal";

const questions = db.questions;

const answerStates = {
  DEFAULT: "DEFAULT",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export default function GameScreen() {
  const router = useRouter();
  const [answerState, setAnswerState] = React.useState<keyof typeof answerStates>(answerStates.DEFAULT);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const questionNumber = currentQuestion + 1;
  const question = questions[currentQuestion];
  const isLastQuestion = questionNumber === questions.length;

  React.useEffect(() => {
    if (isLastQuestion && userAnswers.length === questions.length) {
      const totalPoints = userAnswers.reduce((total, currentAnswer) => total + (currentAnswer ? 1 : 0), 0);
      setShowModal(true);
    }
  }, [userAnswers, isLastQuestion]);

  return (
    <main className={pageStyles.screen} style={{ flex: 1, backgroundImage: `url("${question.image}")` }}>
      {showModal && (
        <Modal
          message={`Você concluiu o desafio! e acertou ${userAnswers.filter((ans) => ans).length} respostas.`}
          onClose={() => {
            setShowModal(false);
            router.push("/");
          }}
        />
      )}
      <section className={pageStyles.container}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <AluraQuizLogo />
        </div>
        <Card headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}>
          <h1>{question.title}</h1>
          <p>{question.description}</p>
          <form
            style={{ marginTop: "24px" }}
            onSubmit={(event) => {
              event.preventDefault();
              const $questionInfo = event.target as HTMLFormElement;
              const formData = new FormData($questionInfo);
              const { alternative } = Object.fromEntries(formData.entries());

              const isCorrectAnswer = alternative === question.answer;
              setUserAnswers([...userAnswers, isCorrectAnswer]);
              setAnswerState(isCorrectAnswer ? answerStates.SUCCESS : answerStates.ERROR);

              setTimeout(() => {
                if (!isLastQuestion) {
                  setCurrentQuestion(currentQuestion + 1);
                  setAnswerState(answerStates.DEFAULT);
                }
              }, 2000);
            }}
          >
            {question.alternatives.map((alternative, index) => (
              <div key={`${alternative}-${index}`} className={pageStyles.alternativeContainer}>
                <Alternative label={alternative} order={index} />
              </div>
            ))}

            {answerState === answerStates.DEFAULT && (
              <button className={pageStyles.confirmButton}>Confirmar</button>
            )}

            <div className={pageStyles.feedbackIcon}>
              {answerState === answerStates.ERROR && (
                <span className={pageStyles.errorIcon} aria-label="Resposta errada">❌</span>
              )}
              {answerState === answerStates.SUCCESS && (
                <span className={pageStyles.successIcon} aria-label="Resposta correta">✅</span>
              )}
            </div>
          </form>
        </Card>
        <Footer />
      </section>
    </main>
  );
}