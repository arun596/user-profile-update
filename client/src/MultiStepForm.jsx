import React, { useState, useEffect } from "react";
import axios from "axios";
import { Country, State, City } from 'country-state-city';

const initialFormData = {
  profilePhoto: null,
  profilePreview: "",
  username: "",
  password: "", 
  passwordStrength: "",
  profession: "",
  companyName: "",
  addressLine1: "",
  country: "",
  state: "",
  city: "",
  subscriptionPlan: "Basic",
  newsletter: true,
};

const MultiStepForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (formData.country) {
      const selectedStates = State.getStatesOfCountry(formData.country);
      setStates(selectedStates);
      setFormData(prev => ({ ...prev, state: '', city: '' }));
    }
  }, [formData.country]);
  useEffect(() => {
    if (formData.state) {
      const selectedCities = City.getCitiesOfState(formData.country, formData.state);
      setCities(selectedCities);
      setFormData(prev => ({ ...prev, city: '' }));
    }
  }, [formData.state]);

  const validateUsername = async () => {
    if (formData.username.length >= 4 && formData.username.length <= 20 && !formData.username.includes(" ")) {
      const res = await axios.get(`/api/check-username/${formData.username}`);
      setFormData((prev) => ({ ...prev, isUsernameAvailable: res.data.available }));
    }
  };

const handlePasswordChange = (password) => {
  const strength =
    password.length >= 8 && /[!@#$%^&*]/.test(password) && /\d/.test(password)
      ? "Strong"
      : "Weak";
  setFormData((prev) => ({ ...prev, password, passwordStrength: strength }));
};


const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file && ["image/jpeg", "image/png"].includes(file.type) && file.size <= 2 * 1024 * 1024) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: reader.result, // base64 string
        profilePreview: reader.result 
      }));
    };
    reader.readAsDataURL(file); // Convert to base64
  } else {
    alert("Only JPG/PNG under 2MB allowed");
  }
};


  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const res = await fetch('https://user-profile-backend-mwbd.onrender.com/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log('Submitted:', data);
      alert("Data Saved Successfully")
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputStyle = "w-full p-2 border rounded mb-4";

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className=" space-y-4">
            <h3 className="text-xl font-bold">Step 1: Personal Info</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} required className={inputStyle} />
            {formData.profilePreview && <img src={formData.profilePreview} alt="Preview" className="w-24 h-24 rounded-full" />}


            <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className={inputStyle} />


            <input type="password" placeholder=" Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className={inputStyle} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Step 2: Professional Info</h3>
            <select value={formData.profession}
             onChange={(e) => setFormData({ ...formData, profession: e.target.value })} className={inputStyle}>
              <option value="">Select Profession</option>
              <option value="Student">Student</option>
              <option value="Developer">Developer</option>
              <option value="Entrepreneur">Entrepreneur</option>
            </select>

            {formData.profession === "Entrepreneur" && (
              <input type="text" placeholder="Company Name" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className={inputStyle} />
            )}
            <input type="text" placeholder="Address Line 1" value={formData.addressLine1} onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })} required className={inputStyle} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Step 3: Preferences</h3>
           <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="block w-full p-2 border"
            >
              <option value="">Select Country</option>
              {countries.map(c => (
                <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
              ))}
            </select>


             <label>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="block w-full p-2 border"
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {states.map(s => (
                <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
              ))}
            </select>

           <label>City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="block w-full p-2 border"
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {cities.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Subscription Plan:</label>
              {['Basic', 'Pro', 'Enterprise'].map(plan => (
                <label key={plan} className="inline-flex items-center gap-2">
                  <input type="radio" name="plan" value={plan} 
                  checked={formData.subscriptionPlan === plan} onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })} /> 
                  {plan}
                </label>
              ))}
            </div>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={formData.newsletter} onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })} /> Subscribe to newsletter
            </label>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Summary</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {renderStep()}
      <div className=" flex justify-between mt-6">
        {step > 1 && <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back</button>}
        {step < 4 && <button onClick={handleNext} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600">Next</button>}
        {step === 4 && <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Submit</button>}
      </div>
    </div>
  );
};

export default MultiStepForm;
