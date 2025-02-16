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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Corporate Form</h2>

        <div className="mb-6">
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            placeholder="Enter First Name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <div className="mb-6">
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            placeholder="Enter Last Name" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <div className="mb-6">
          <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-2">Salary:</label>
          <input 
            type="number" 
            id="salary" 
            placeholder="Enter Salary" 
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required 
          />
        </div>

        <button 
          onClick={generatePDF}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}
