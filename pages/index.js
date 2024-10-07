import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CreateTeamModal from "../components/CreateTeamModal";
import JoinTeamModal from "../components/JoinTeamModal";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false);
  const [userTeams, setUserTeams] = useState([]);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo();
      fetchUserTeams();
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/user/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
      } else {
        console.error("사용자 정보 조회 실패:", response.status);
      }
    } catch (error) {
      console.error("사용자 정보 조회 오류:", error);
    }
  };

  const fetchUserTeams = async () => {
    try {
      const response = await fetch("/api/user/teams", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserTeams(data);
      } else {
        console.error("팀 정보 조회 실패:", response.status);
      }
    } catch (error) {
      console.error("팀 정보 조회 오류:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserTeams([]);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container px-4 py-8 mx-auto">
        <header className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold text-blue-800">축구 팀 관리 웹사이트</h1>
          <p className="text-xl text-blue-600">팀을 관리하고 경기를 조율하세요</p>
        </header>

        <main className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
          {isLoggedIn ? (
            <div className="p-6 space-y-6">
              {userName && (
                <div className="p-4 bg-blue-100 border-l-4 border-blue-500 rounded-r-lg">
                  <h2 className="text-lg font-semibold text-blue-800">환영합니다!</h2>
                  <p className="text-blue-700">{userName}님</p>
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-800">내 팀 목록</h3>
                {userTeams.length > 0 ? (
                  userTeams.map((team, index) => (
                    <div key={index} className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                      <h4 className="font-medium text-blue-700">{team.teamName}</h4>
                      <p className="text-sm text-blue-600">팀 코드: {team.teamCode}</p>
                      <Link href={`/team/${team.teamId}`} className="text-sm text-blue-500 underline">
                        팀 상세 보기
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-blue-600">아직 가입한 팀이 없습니다.</p>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowCreateTeamModal(true)}
                  className="w-full px-4 py-2 font-medium text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  새 팀 생성
                </button>
                <button
                  onClick={() => setShowJoinTeamModal(true)}
                  className="w-full px-4 py-2 font-medium text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  팀 가입
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 font-medium text-blue-700 transition duration-300 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              <Link
                href="/login"
                className="block w-full px-4 py-2 font-medium text-center text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="block w-full px-4 py-2 font-medium text-center text-blue-700 transition duration-300 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
              >
                회원가입
              </Link>
            </div>
          )}
        </main>
      </div>
      {showCreateTeamModal && (
        <CreateTeamModal
          onClose={() => {
            setShowCreateTeamModal(false);
            fetchUserTeams();
          }}
        />
      )}
      {showJoinTeamModal && (
        <JoinTeamModal
          onClose={() => {
            setShowJoinTeamModal(false);
            fetchUserTeams();
          }}
        />
      )}
    </div>
  );
}