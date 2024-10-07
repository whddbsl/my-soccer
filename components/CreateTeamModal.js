import React, { useState } from 'react';

const POSITIONS = ['LW', 'ST', 'RW', 'CAM', 'CM', 'CDM', 'LB', 'RB', 'CB', 'GK'];

export default function CreateTeamModal({ onClose, onTeamCreated = () => {} }) {
  const [teamName, setTeamName] = useState('');
  const [selectedPositions, setSelectedPositions] = useState([]);

  const handlePositionChange = (position) => {
    setSelectedPositions(prev => {
      if (prev.includes(position)) {
        return prev.filter(p => p !== position);
      } else if (prev.length < 3) {
        return [...prev, position];
      }
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPositions.length === 0) {
      alert("최소 1개의 포지션을 선택해주세요.");
      return;
    }
    try {
      const response = await fetch('/api/team/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ teamName, position: selectedPositions.join(',') })
      });
      const data = await response.json();
      if (response.ok) {
        alert('팀이 생성되었습니다.');
        if (typeof onTeamCreated === 'function') {
          onTeamCreated();
        }
        onClose();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('팀 생성 오류:', error);
      alert('팀 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50" id="my-modal">
      <div className="relative p-5 mx-auto bg-white border rounded-md shadow-lg top-20 w-96">
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">팀 생성</h3>
          <form onSubmit={handleSubmit} className="py-3 mt-2 px-7">
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="팀 이름"
              className="block w-full px-3 py-2 mt-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
              required
            />
            <div className="mt-4">
              <p className="mb-2 text-sm text-gray-600">선호 포지션 (최소 1개, 최대 3개 선택)</p>
              <div className="flex flex-wrap gap-2">
                {POSITIONS.map((position) => (
                  <button
                    key={position}
                    type="button"
                    onClick={() => handlePositionChange(position)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedPositions.includes(position)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {position}
                  </button>
                ))}
              </div>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="w-full px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                팀 생성
              </button>
            </div>
          </form>
          <div className="items-center px-4 py-3">
            <button
              id="cancel-btn"
              onClick={onClose}
              className="w-full px-4 py-2 text-base font-medium text-white bg-gray-500 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
