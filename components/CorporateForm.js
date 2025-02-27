"use client"

import { useState, useEffect } from 'react';

export default function CorporateForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [salary, setSalary] = useState('');
  const [jsPDFReady, setJsPDFReady] = useState(false);

  useEffect(() => {
    // Dynamically import jsPDF in the client
    const loadJsPDF = async () => {
      const jspdfModule = await import('jspdf');
      window.jspdf = jspdfModule;
      setJsPDFReady(true);
    };

    loadJsPDF();
  }, []);

  const generatePDF = () => {
    if (!jsPDFReady) {
      alert('PDF generator is still loading. Please try again in a moment.');
      return;
    }

    if (!firstName || !lastName || !salary) {
      alert('Please fill all fields');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const salaryNum = parseFloat(salary);
    const doubledSalary = salaryNum * 2;

    doc.setFont("helvetica", "bold");
    doc.text("Corporate Employee Details", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.text(`First Name: ${firstName}`, 20, 40);
    doc.text(`Last Name: ${lastName}`, 20, 50);
    doc.text(`Original Salary: ${salary}`, 20, 60);
    doc.text(`Doubled Salary: ${doubledSalary}`, 20, 70);

    doc.save(`${firstName}_${lastName}_Details.pdf`);
  };

  return (

    <div className="bg-blue-500 p-4 m-4">Test container</div>    
    <div className="bg-white p-6 rounded-lg shadow-md w-80 mx-auto my-8">
      <h2 className="text-xl font-bold mb-4 text-center">Corporate Form</h2>
      
      <div className="mb-4">
        <label htmlFor="firstName" className="block font-semibold mb-1">First Name:</label>
        <input 
          type="text" 
          id="firstName" 
          placeholder="Enter First Name" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block font-semibold mb-1">Last Name:</label>
        <input 
          type="text" 
          id="lastName" 
          placeholder="Enter Last Name" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
      </div>

      <div className="mb-4">
        <label htmlFor="salary" className="block font-semibold mb-1">Salary:</label>
        <input 
          type="number" 
          id="salary" 
          placeholder="Enter Salary" 
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required 
        />
      </div>

      <button 
        onClick={generatePDF}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        Generate PDF
      </button>
    </div>
  );
}
