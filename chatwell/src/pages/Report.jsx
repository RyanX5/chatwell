import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">No Report Available</h2>
        <p className="text-gray-600 mb-6">Please submit the form first.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Form
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Healthcare Report</h2>

      <div className="space-y-4">
        <Section title="Personal Info" items={{
          'Name': data.name,
          'Age': data.age,
          'Gender': data.gender,
        }} />

        <Section title="Medical History" items={{
          'Pre-existing Conditions': data.conditions || 'None',
          'Known Allergies': data.allergies || 'None',
        }} />

        <Section title="Lifestyle Habits" items={{
          'Exercise Frequency': data.exercise,
          'Diet Type': data.diet,
          'Sleep Hours': data.sleep,
        }} />

        <Section title="Current Health" items={{
          'Current Conditions': data.currentConditions || 'None',
        }} />

        <Section title="Preferences" items={{
          'Healthcare Goals': data.goals || 'Not specified',
          'Preferred Workouts': data.preferredWorkouts || 'Not specified',
        }} />
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Form
        </button>
      </div>
    </div>
  );
};

const Section = ({ title, items }) => (
  <div className="border-b pb-4">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <ul className="text-gray-700 space-y-1">
      {Object.entries(items).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> {value}
        </li>
      ))}
    </ul>
  </div>
);

export default Report;
