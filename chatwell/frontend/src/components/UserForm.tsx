import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css';

interface UserData {
  name: string;
  age: string;
  location: string;
  allergies: string;
  diseases: string;
  gender: string;
}

const UserForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: '',
    location: '',
    allergies: '',
    diseases: '',
    gender: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:3001/api/user-info', userData);
      
      // Store session ID in localStorage if provided
      if (response.data && response.data.sessionId) {
        localStorage.setItem('chatwell_session_id', response.data.sessionId);
      }
      
      navigate('/chat');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
      <div className="form-container">
        <h2>Welcome to Chatwell</h2>
        <p>Please provide your information to get started</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={userData.age}
              onChange={handleChange}
              required
            />
          </div>
  
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={userData.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="allergies">Allergies</label>
            <textarea
              id="allergies"
              name="allergies"
              value={userData.allergies}
              onChange={handleChange}
              placeholder="List any allergies or type 'None'"
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="diseases">Diseases</label>
            <textarea
              id="diseases"
              name="diseases"
              value={userData.diseases}
              onChange={handleChange}
              placeholder="List any diseases you've had in the past or 'None'"
              required
            />
          </div>

          <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
              id="gender"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

  
          
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    );
}  

export default UserForm;
