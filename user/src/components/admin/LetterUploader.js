import React, { useState } from 'react';
import axios from 'axios';
import './LetterUploader.css';

export const LetterUploader = () => {
  const [contentName, setContentName] = useState('');
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [validationRequired, setValidationRequired] = useState(false);
  const [uploadDate, setUploadDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const uploadDateChange = (e) => {
    const selectedDate = e.target.value;
    if (new Date(selectedDate) <= new Date()) {
      setUploadDate(selectedDate);
    } else {
      setError('Upload date cannot be in the future.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      contentName,
      heading,
      content: content.split('\n'),
      validationRequired,
      questions: validationRequired ? questions : []
    };
//love-link-mtyd.onrender.com
    try {
      await axios.post('http://localhost:8000/api/letter/upload', payload);
      setSuccess(true);
      setError('');
      setContent('');
      setContentName('');
      setHeading('');
      setQuestions([{ question: '', answer: '' }]);
    } catch (err) {
      console.error(err);
      setError('Failed to upload letter. error is;?',err);
    }
  };

  return (
    <div className="admin-upload-container">
      <h2>📮 Upload a New Letter</h2>

      <form onSubmit={handleSubmit}>
        <label>Content Name</label>
        <input value={contentName} onChange={e => setContentName(e.target.value)} required />

        <label>Heading</label>
        <input value={heading} onChange={e => setHeading(e.target.value)} required />

        <label>Letter Content (Each paragraph separated by new line)</label>
        <textarea
          rows="10"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your letter here..."
          required
        />
        <label>Upload Date</label>
        <input
          type="date"
          value={uploadDate}
          onChange={uploadDateChange}
          max={new Date().toISOString().slice(0, 10)} // Prevent future dates
          required
        />
        <div className="validation-section">
          <label>
            <input
              type="checkbox"
              checked={validationRequired}
              onChange={() => setValidationRequired(!validationRequired)}
            />
            Requires Validation?
          </label>
        </div>

        {validationRequired && (
          <div className="question-block">
            <h4>Security Questions</h4>
            {questions.map((q, index) => (
              <div key={index} className="question-pair">
                <input
                  type="text"
                  placeholder="Question"
                  value={q.question}
                  onChange={e => handleQuestionChange(index, 'question', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Answer"
                  value={q.answer}
                  onChange={e => handleQuestionChange(index, 'answer', e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addQuestion}>+ Add More</button>
          </div>
        )}

        <button type="submit">Upload Letter</button>
        {success && <div className="success-message">Letter uploaded successfully 🎉</div>}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};


