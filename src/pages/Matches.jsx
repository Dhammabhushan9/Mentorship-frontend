import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Matches = () => {
  const [matches, setMatches] = useState([]);

  const fetchMatches = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get("https://mentorship-backend-chi.vercel.app/api/matches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatches(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match) => (
          <div key={match.userId} className="bg-white p-4 shadow rounded">
            <h3 className="text-xl font-bold">{match.userId.username}</h3>
            <p>{match.bio}</p>
            <ul className="mt-2">
              {match.skills.map((skill, index) => (
                <li key={index} className="text-sm text-gray-600">{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
