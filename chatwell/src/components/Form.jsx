import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';  

const HealthCareForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = (data) => {
    console.log(data); 
    alert("Form submitted successfully!");

    
    navigate('/report');  
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Personalized Healthcare Recommendation Form</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Personal Information */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium">Full Name</label>
            <input
              {...register('name', { required: 'Full Name is required' })}
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-lg font-medium">Age</label>
            <input
              {...register('age', { required: 'Age is required', valueAsNumber: true, min: 1 })}
              type="number"
              id="age"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-lg font-medium">Gender</label>
            <select
              {...register('gender', { required: 'Gender is required' })}
              id="gender"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
          </div>
        </div>

        {/* Medical History */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Medical History</h3>
          
          <div className="mb-4">
            <label htmlFor="conditions" className="block text-lg font-medium">Pre-existing Conditions</label>
            <textarea
              {...register('conditions')}
              id="conditions"
              placeholder="E.g., Diabetes, Hypertension"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="allergies" className="block text-lg font-medium">Known Allergies</label>
            <textarea
              {...register('allergies')}
              id="allergies"
              placeholder="E.g., Penicillin, Pollen"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="medications" className="block text-lg font-medium">Current Medications</label>
            <textarea
              {...register('medications')}
              id="medications"
              placeholder="E.g., Metformin, Lisinopril"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>
        </div>

        {/* Lifestyle Habits */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Lifestyle Habits</h3>

          <div className="mb-4">
            <label htmlFor="exercise" className="block text-lg font-medium">Exercise Frequency</label>
            <select
              {...register('exercise', { required: 'Exercise frequency is required' })}
              id="exercise"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Frequency</option>
              <option value="never">Never</option>
              <option value="1-2 times/week">1-2 times/week</option>
              <option value="3-4 times/week">3-4 times/week</option>
              <option value="daily">Daily</option>
            </select>
            {errors.exercise && <span className="text-red-500 text-sm">{errors.exercise.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="diet" className="block text-lg font-medium">Diet Type</label>
            <select
              {...register('diet', { required: 'Diet type is required' })}
              id="diet"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Diet</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="balanced">Balanced</option>
            </select>
            {errors.diet && <span className="text-red-500 text-sm">{errors.diet.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="sleep" className="block text-lg font-medium">Average Sleep Hours</label>
            <input
              {...register('sleep', { required: 'Sleep hours are required', valueAsNumber: true, min: 1, max: 24 })}
              type="number"
              id="sleep"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.sleep && <span className="text-red-500 text-sm">{errors.sleep.message}</span>}
          </div>
        </div>

        {/* Current Health Conditions */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Current Health Conditions</h3>

          <div className="mb-4">
            <label htmlFor="currentConditions" className="block text-lg font-medium">Current Health Conditions</label>
            <textarea
              {...register('currentConditions')}
              id="currentConditions"
              placeholder="E.g., Asthma, Arthritis"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Healthcare Preferences</h3>

          <div className="mb-4">
            <label htmlFor="goals" className="block text-lg font-medium">Healthcare Goals</label>
            <textarea
              {...register('goals')}
              id="goals"
              placeholder="E.g., Weight loss, Improve mental health"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="preferredWorkouts" className="block text-lg font-medium">Preferred Workout Types</label>
            <input
              {...register('preferredWorkouts')}
              type="text"
              id="preferredWorkouts"
              placeholder="E.g., Yoga, Running, Weightlifting"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default HealthCareForm;
