import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <header className="hero">
        <h1>Welcome to Dr. Chatwell</h1>
        <p>Your AI-powered personalized health assistant</p>
        <a href="/form" className="cta-button">Get Started</a>
      </header>

      <section className="features">
        <div className="feature">
          <h2>Natural Conversations</h2>
          <p>Talk with our AI like you would with a real health professional.</p>
        </div>
        <div className="feature">
          <h2>Instant Insights</h2>
          <p>Get real-time analysis and suggestions while you chat.</p>
        </div>
        <div className="feature">
          <h2>24/7 Availability</h2>
          <p>Dr. Chatwell is always on, ready to help whenever you need it.</p>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li><strong>Sign up</strong> and create your health profile</li>
          <li><strong>Chat</strong> with Dr. Chatwell about symptoms or concerns</li>
          <li><strong>Get personalized advice</strong> and actionable recommendations</li>
        </ol>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Dr. Chatwell. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
