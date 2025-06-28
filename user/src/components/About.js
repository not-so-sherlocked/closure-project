import React from 'react';
import './About.css'; // Optional: Add your custom styles here

export const About = () => {
  return (
    <div className="about-container">
      <div className="content-wrapper">

        <h1>About This Blog</h1>
      <p>
        This is a personal blog space where the author shares thoughts, emotions, and stories
        in the form of letters and diaries.
      </p>
      <p>
        If you've landed here, it likely means the author shared this page with you directly —
        either through a personal link or by mentioning it. These letters aren't broadcasted
        to the world. They're carefully handed out, like a whisper in a crowded room.
      </p>
      <p>
        Some letters may ask you to answer a few questions before revealing their content.
        This small validation step ensures the letter reaches the right person — someone the
        author trusts or remembers.
      </p>
      <p>
        If you're reading this, consider yourself part of a quiet circle — you've been given
        a key to something personal.
      </p>
      <p style={{ fontStyle: 'italic', marginTop: '30px' }}>
        Handle it with care. You're already closer to the author than most.
      </p>

      </div>
      
    </div>
  );
};


