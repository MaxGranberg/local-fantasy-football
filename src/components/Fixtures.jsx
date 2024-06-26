import React, { useEffect, useState } from 'react';

function Fixtures() {
  const [teams, setTeams] = useState([]); // Teams fetched from the API
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teamName, setTeamName] = useState('');
  const [src, setSrc] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      setTeamName(teams.find(team => team.id === selectedTeam)?.name)
      setSrc(`/upcoming-fixtures-${teamName}.html`)
    }
  }, [selectedTeam, teamName, teams]);

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/teams`)
      if (!response.ok) throw new Error('Failed to fetch teams');
      const teamsData = await response.json();
      setTeams(teamsData);
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

  return (
    <div className="fixtures max-w-7xl mx-auto px-6 py-8 bg-gray-50 shadow-xl rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 mb-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">Sök alla matcher för ett lag</h1>
        <select
            value={selectedTeam}
            onChange={e => setSelectedTeam(e.target.value)}
            className="p-3 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Välj ett lag</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        <div id="fixtures-info" className="overflow-y-auto max-h-screen">
            <iframe className="mt-4 mb-4" src={src} style={{ width: '100%', height: '800px' }} title="Fixtures"></iframe>
        </div>
      </div>
      <div className="overflow-y-auto">
        <h2 className="text-lg text-center font-semibold text-blue-800 mt-2 mb-4">Kommande matcher</h2>
        <iframe src="/upcoming-fixtures.html" style={{ width: '100%', height: '250px', border: 'none' }} title="Upcoming fixtures"></iframe>
        <h2 className="text-lg text-center font-semibold text-blue-800 mb-4">Tabell</h2>
        <iframe src="/league-standings.html" style={{ width: '100%', height: '500px', border: 'none' }} title="League Standings"></iframe>
      </div>
    </div>
  );
}

export default Fixtures;
