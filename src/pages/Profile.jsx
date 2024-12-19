import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({ skills: [], interests: [], bio: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isNewProfile, setIsNewProfile] = useState(false);

  const API_URL = "https://mentorship-backend-eight.vercel.app";

  // Fetch the user's profile
  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/api/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      setIsNewProfile(false); // Profile exists
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // No profile found, switch to create mode
        setIsNewProfile(true);
        setProfile({ skills: [], interests: [], bio: '' });
      } else {
        setError('Failed to fetch profile. Please try again.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Create a new profile
  const handleCreate = async () => {
    if (!profile.skills.length || !profile.interests.length || !profile.bio.trim()) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.post(`https://mentorship-backend-eight.vercel.app/api/profiles`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile created successfully!');
      setIsNewProfile(false); // Switch to edit mode
      setError('');
      fetchProfile(); // Refresh the profile
    } catch (err) {
      setError('Failed to create profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update the user's profile
  const handleUpdate = async () => {
    if (!profile.skills.length || !profile.interests.length || !profile.bio.trim()) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${API_URL}/api/profiles/me`, profile, {
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
      <h2 className="text-2xl font-bold mb-4">{isNewProfile ? 'Create Your Profile' : 'Your Profile'}</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
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
            onClick={isNewProfile ? handleCreate : handleUpdate}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (isNewProfile ? 'Creating...' : 'Updating...') : isNewProfile ? 'Create Profile' : 'Update Profile'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
