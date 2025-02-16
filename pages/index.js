// pages/index.js
"use client";
import { useState } from "react";
import { jsPDF } from "jspdf";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [salary, setSalary] = useState("");

  const generatePDF = () => {
    if (!firstName || !lastName || !salary) {
      alert("Please fill all fields");
      return;
    }
    const doc = new jsPDF();
    const doubledSalary = salary * 2;

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Corporate Form</h2>
        <label className="block font-medium">First Name:</label>
        <input 
          type="text" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          placeholder="Enter First Name" 
          required 
          className="w-full p-2 mt-1 border rounded-md"
        />
        <label className="block font-medium mt-2">Last Name:</label>
        <input 
          type="text" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          placeholder="Enter Last Name" 
          required 
          className="w-full p-2 mt-1 border rounded-md"
        />
        <label className="block font-medium mt-2">Salary:</label>
        <input 
          type="number" 
          value={salary} 
          onChange={(e) => setSalary(e.target.value)} 
          placeholder="Enter Salary" 
          required 
          className="w-full p-2 mt-1 border rounded-md"
        />
        <button 
          onClick={generatePDF} 
          className="w-full bg-blue-500 text-white font-medium py-2 mt-4 rounded-md hover:bg-blue-700"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}
