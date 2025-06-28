import React, { useState, useEffect } from "react";
import { getLetterById, getLetterByIdWithQuestions } from "../api/letterApi";
import { Link, useParams } from 'react-router-dom';
import "./LetterView.css";

export const LetterView = () => {
  const { id } = useParams();
  const [letter, setLetter] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [uploadDate, setUploadDate] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    getLetterById(id)
      .then(res => {
        if(res.data.message ==="user auth required"){

        }
        if (res.data.questions?.length > 0 && res.data.message === "Validation required") {
          setQuestions(res.data.questions);
        } else if (res.data) {
          setLetter(res.data);
        }
      })
      .catch(err => console.error("API error:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    getLetterByIdWithQuestions(id, answers)
      .then(res => {
        if (res.data) {
          setLetter(res.data);
          setShowModal(false);
        }
      })
      .catch(err => {
        setError("Verification failed. Please try again.");
        console.error("API error:", err);
      });
  };

  return (
    <div className="manuletter-view-container">
      <header className="manuletter-view-header">
        <Link to="/" className="manuletter-back">
          ← Back to Archive
        </Link>
        <div className="manuletter-view-id">Document ID: {id}</div>
      </header>

      {loading ? (
        <div className="manuletter-view-loading">
          <div className="loading-line"></div>
          <div className="loading-line"></div>
          <div className="loading-line"></div>
        </div>
      ) : letter ? (
        <article className="manuletter-document">
          <h2 className="manuletter-document-title">{letter.heading}</h2>
          <div className="manuletter-document-content">
            {letter.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          
        </article>
      ) : questions.length > 0 ? (
        <>
          <div className="manuletter-auth-prompt">
            <h3>Authentication Required</h3>
            <p>This document requires identity verification</p>
            <button 
              className="manuletter-auth-button"
              onClick={() => setShowModal(true)}
            >
              Verify Identity
            </button>
          </div>

          {showModal && (
            <div className="manuletter-modal-overlay">
              <div className="manuletter-modal">
                <h3>Security Questions</h3>
                {questions.map((q, index) => (
                  <div key={index} className="manuletter-question">
                    <label>{q}</label>
                    <input
                      type="text"
                      value={answers[index] || ""}
                      onChange={e => handleAnswerChange(index, e.target.value)}
                      className="manuletter-answer"
                    />
                  </div>
                ))}
                {error && <div className="manuletter-error">{error}</div>}
                <div className="manuletter-modal-actions">
                  <button 
                    className="manuletter-modal-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="manuletter-modal-submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="manuletter-empty">
          Document not available
        </div>
      )}
    </div>
  );
};