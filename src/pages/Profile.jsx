import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({ skills: [], interests: [], bio: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch the user's profile
  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://mentorship-backend-chi.vercel.app//api/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update the user's profile
  const handleUpdate = async () => {
    if (!profile.skills.length || !profile.interests.length || !profile.bio.trim()) {
      setError('Please fill in all fields before updating.');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/profiles/me`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
      setError('');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <div className="text-center text-blue-600">Loading...</div>
      ) : (
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={profile.skills.join(', ')}
              onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(', ') })}
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Interests</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              value={profile.interests.join(', ')}
              onChange={(e) => setProfile({ ...profile, interests: e.target.value.split(', ') })}
              placeholder="e.g., Blockchain, AI, Cloud Computing"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
              rows="3"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="A brief description about yourself"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
