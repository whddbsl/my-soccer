import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaUsers, FaUserTie, FaVoteYea, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const positionOrder = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'ST', 'RW'];

// 컴포넌트 상단에 다음 함수를 추가합니다
const findManager = (members) => {
  return members?.find(member => member.role === '감독') || null;
};

export default function TeamDetail() {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState([]);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [voteTitle, setVoteTitle] = useState('');
  const [voteDate, setVoteDate] = useState('');
  const [voteTime, setVoteTime] = useState('12:00');
  const [voteLocation, setVoteLocation] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [showPositions, setShowPositions] = useState(false);
  const [showVotes, setShowVotes] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);  // 추가된 부분
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [voteDetails, setVoteDetails] = useState({});
  const router = useRouter();
  const { teamId } = router.query;

  useEffect(() => {
    if (teamId) {
      fetchTeamDetails();
      fetchVotes();
    }
  }, [teamId]);

  const fetchTeamDetails = async () => {
    try {
      const response = await fetch(`/api/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Fetched team data:', data);
        setTeam(data);
        setUserRole(data.userRole);
      } else {
        setError(`팀 정보를 불러오는데 실패했습니다: ${data.message}`);
      }
    } catch (error) {
      setError(`팀 정보를 불러오는 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchVotes = async () => {
    try {
      const response = await fetch(`/api/vote/list?teamId=${teamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVotes(data);
      } else {
        console.error('투표 목록을 불러오는데 실패했습니다:', data.message);
      }
    } catch (error) {
      console.error('투표 목록을 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  const handleCreateVote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/vote/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          teamId,
          title: voteTitle,
          date: voteDate,
          time: voteTime,
          location: voteLocation,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('투표가 생성되었습니다.');
        setShowVoteForm(false);
        fetchVotes();
        setVoteTitle('');
        setVoteDate('');
        setVoteTime('12:00');
        setVoteLocation('');
      } else {
        alert(`투표 생성 실패: ${data.message}`);
      }
    } catch (error) {
      console.error('투표 생성 중 오류 발생:', error);
      alert('투표 생성 중 오류가 발생했습니다.');
    }
  };

  const handleVote = (voteId) => {
    console.log('선택된 투표 ID:', voteId);
    setSelectedVote(voteId);
    setShowVoteModal(true);
  };

  const groupMembersByPosition = () => {
    if (!team || !team.members || !Array.isArray(team.members)) {
      return {};
    }
    const grouped = {};
    positionOrder.forEach(pos => {
      grouped[pos] = team.members.filter(m => m.position && m.position.split(',').includes(pos));
    });
    return grouped;
  };

  const fetchVoteDetails = async (voteId) => {
    try {
      const response = await fetch(`/api/vote/${voteId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setVoteDetails(prevDetails => ({...prevDetails, [voteId]: data}));
      } else {
        console.error('투표 상세 정보 조회 실패:', data.message);
        alert(`투표 상세 정보 조회 실패: ${data.message}`);
      }
    } catch (error) {
      console.error('투표 상세 정보 조회 중 오류 발생:', error);
      alert(`투표 상세 정보 조회 중 오류 발생: ${error.message}`);
    }
  };

  const toggleVoteDetails = (voteId) => {
    if (!voteDetails[voteId]) {
      fetchVoteDetails(voteId);
    }
    setVoteDetails(prevDetails => ({
      ...prevDetails,
      [voteId]: {...prevDetails[voteId], isOpen: !prevDetails[voteId]?.isOpen}
    }));
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  if (!team) {
    return <div>팀 정보를 찾을 수 없습니다.</div>;
  }

  const groupedMembers = groupMembersByPosition();
  const manager = findManager(team.members);

  const handleGoBack = () => {
    router.back();
  };

  const toggleButtonClass = (isOpen) => 
    `w-full flex justify-between items-center p-4 rounded-lg transition duration-200 ${
      isOpen 
        ? 'bg-blue-500 text-white hover:bg-blue-600' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`;

  const submitVote = async (choice) => {
    if (!selectedVote) {
      console.error('선택된 투표가 없습니다.');
      // 사용자에게 오류 메시지 표시
      return;
    }

    try {
      console.log('투표 제출:', { voteId: selectedVote, choice });

      const response = await fetch('/api/vote/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          voteId: selectedVote,
          choice: choice
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('투표 성공:', data.message);
        // 투표 목록 새로고침
        fetchVotes();
        setShowVoteModal(false);
      } else {
        console.error('투표 제출 실패:', data.message, data.error);
        // 사용자에게 오류 메시지 표시
        alert(`투표 제출 실패: ${data.message}`);
      }
    } catch (error) {
      console.error('투표 제출 중 오류 발생:', error);
      // 사용자에게 오류 메시지 표시
      alert(`투표 제출 중 오류 발생: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{team.teamName}</h2>
              <button
                onClick={handleGoBack}
                className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
              >
                뒤로 가기
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
              <div className="flex items-center p-4 bg-blue-100 rounded-lg">
                <FaUserTie className="mr-3 text-2xl text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-blue-500">감독</p>
                  <p className="text-lg font-bold text-blue-700">{manager ? manager.name : '없음'}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-100 rounded-lg">
                <FaUsers className="mr-3 text-2xl text-green-500" />
                <div>
                  <p className="text-sm font-semibold text-green-500">멤버 수</p>
                  <p className="text-lg font-bold text-green-700">{team.members?.length || 0}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-100 rounded-lg">
                <FaVoteYea className="mr-3 text-2xl text-purple-500" />
                <div>
                  <p className="text-sm font-semibold text-purple-500">팀 코드</p>
                  <p className="text-lg font-bold text-purple-700">{team.teamCode}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <button
                onClick={() => setShowPositions(!showPositions)}
                className={toggleButtonClass(showPositions)}
              >
                <span className="text-xl font-semibold">포지션별 선수</span>
                {showPositions ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showPositions && (
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                  {positionOrder.map(position => {
                    const members = groupMembersByPosition()[position];
                    return members && members.length > 0 ? (
                      <div key={position} className="p-4 rounded-lg shadow bg-gray-50">
                        <h4 className="mb-2 font-semibold text-gray-600">{position}</h4>
                        <ul className="space-y-1">
                          {members.map(member => (
                            <li key={member.userId} className="text-gray-700">{member.name}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            <div className="mt-8">
              <button
                onClick={() => setShowVotes(!showVotes)}
                className={toggleButtonClass(showVotes)}
              >
                <span className="text-xl font-semibold">투표 목록</span>
                {showVotes ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showVotes && (
                <div className="mt-4 space-y-4">
                  {votes.map(vote => (
                    <div key={vote._id} className="p-4 rounded-lg shadow bg-gray-50">
                      <h4 className="mb-2 text-lg font-semibold">{vote.title}</h4>
                      <p className="mb-2 text-gray-600">날짜: {vote.date} {vote.time}</p>
                      <p className="mb-3 text-gray-600">장소: {vote.location}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="mr-4">참석: {vote.attendees?.length || 0}</span>
                          <span>불참석: {vote.absentees?.length || 0}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleVote(vote._id)}
                            className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                          >
                            투표하기
                          </button>
                          <button
                            onClick={() => toggleVoteDetails(vote._id)}
                            className="px-4 py-2 text-gray-700 transition duration-200 bg-gray-300 rounded hover:bg-gray-400"
                          >
                            {voteDetails[vote._id]?.isOpen ? '접기' : '상세보기'}
                          </button>
                        </div>
                      </div>
                      {voteDetails[vote._id]?.isOpen && (
                        <div className="mt-4">
                          <h5 className="mb-2 font-semibold">참석자 목록:</h5>
                          <ul className="mb-4 list-disc list-inside">
                            {voteDetails[vote._id]?.attendees?.map(attendee => (
                              <li key={attendee.userId}>{attendee.name}</li>
                            )) || <li>참석자가 없습니다.</li>}
                          </ul>
                          <h5 className="mb-2 font-semibold">불참석자 목록:</h5>
                          <ul className="list-disc list-inside">
                            {voteDetails[vote._id]?.absentees?.map(absentee => (
                              <li key={absentee.userId}>{absentee.name}</li>
                            )) || <li>불참석자가 없습니다.</li>}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {userRole === '감독' && (
              <div className="mt-8">
                <button
                  onClick={() => setShowVoteForm(!showVoteForm)}
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                  {showVoteForm ? '투표 생성 취소' : '새 투표 생성'}
                </button>
                {showVoteForm && (
                  <form onSubmit={handleCreateVote} className="mt-4">
                    <input
                      type="text"
                      value={voteTitle}
                      onChange={(e) => setVoteTitle(e.target.value)}
                      placeholder="투표 제목"
                      className="w-full p-2 mb-2 border rounded"
                      required
                    />
                    <input
                      type="date"
                      value={voteDate}
                      onChange={(e) => setVoteDate(e.target.value)}
                      className="w-full p-2 mb-2 border rounded"
                      required
                    />
                    <input
                      type="time"
                      value={voteTime}
                      onChange={(e) => setVoteTime(e.target.value)}
                      className="w-full p-2 mb-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      value={voteLocation}
                      onChange={(e) => setVoteLocation(e.target.value)}
                      placeholder="장소"
                      className="w-full p-2 mb-2 border rounded"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-green-500 rounded"
                    >
                      투표 생성
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showVoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-xl">
            <h3 className="mb-4 text-xl font-semibold">투표하기</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => submitVote('참석')}
                className="px-4 py-2 text-white transition duration-200 bg-green-500 rounded hover:bg-green-600"
              >
                참석
              </button>
              <button
                onClick={() => submitVote('불참석')}
                className="px-4 py-2 text-white transition duration-200 bg-red-500 rounded hover:bg-red-600"
              >
                불참석
              </button>
            </div>
            <button
              onClick={() => setShowVoteModal(false)}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}