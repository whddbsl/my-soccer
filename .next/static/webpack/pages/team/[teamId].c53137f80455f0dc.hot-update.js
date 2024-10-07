"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/team/[teamId]",{

/***/ "./pages/team/[teamId].js":
/*!********************************!*\
  !*** ./pages/team/[teamId].js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ TeamDetail; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _s = $RefreshSig$();\n\n\n\nconst positionOrder = [\n    \"GK\",\n    \"CB\",\n    \"LB\",\n    \"RB\",\n    \"CDM\",\n    \"CM\",\n    \"CAM\",\n    \"LW\",\n    \"ST\",\n    \"RW\"\n];\nfunction TeamDetail() {\n    _s();\n    const [team, setTeam] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [votes, setVotes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [showVoteForm, setShowVoteForm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [voteTitle, setVoteTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [voteDate, setVoteDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [voteTime, setVoteTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"12:00\");\n    const [voteLocation, setVoteLocation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [userRole, setUserRole] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { teamId } = router.query;\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (teamId) {\n            fetchTeamDetails();\n            fetchVotes();\n        }\n    }, [\n        teamId\n    ]);\n    const fetchTeamDetails = async ()=>{\n        try {\n            const response = await fetch(\"/api/team/\".concat(teamId), {\n                headers: {\n                    Authorization: \"Bearer \".concat(localStorage.getItem(\"token\"))\n                }\n            });\n            const data = await response.json();\n            if (response.ok) {\n                console.log(\"Fetched team data:\", data);\n                setTeam(data);\n                setUserRole(data.userRole);\n            } else {\n                setError(\"팀 정보를 불러오는데 실패했습니다: \".concat(data.message));\n            }\n        } catch (error) {\n            setError(\"팀 정보를 불러오는 중 오류가 발생했습니다: \".concat(error.message));\n        } finally{\n            setLoading(false);\n        }\n    };\n    const fetchVotes = async ()=>{\n        try {\n            const response = await fetch(\"/api/vote/list?teamId=\".concat(teamId), {\n                headers: {\n                    Authorization: \"Bearer \".concat(localStorage.getItem(\"token\"))\n                }\n            });\n            const data = await response.json();\n            if (response.ok) {\n                setVotes(data);\n            } else {\n                console.error(\"투표 목록을 불러오는데 실패했습니다:\", data.message);\n            }\n        } catch (error) {\n            console.error(\"투표 목록을 불러오는 중 오류가 발생했습니다:\", error);\n        }\n    };\n    const handleCreateVote = async (e)=>{\n        e.preventDefault();\n        try {\n            const response = await fetch(\"/api/vote/create\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(localStorage.getItem(\"token\"))\n                },\n                body: JSON.stringify({\n                    teamId,\n                    title: voteTitle,\n                    date: voteDate,\n                    time: voteTime,\n                    location: voteLocation\n                })\n            });\n            const data = await response.json();\n            if (response.ok) {\n                alert(\"투표가 생성되었습니다.\");\n                setShowVoteForm(false);\n                fetchVotes();\n                setVoteTitle(\"\");\n                setVoteDate(\"\");\n                setVoteTime(\"12:00\");\n                setVoteLocation(\"\");\n            } else {\n                alert(\"투표 생성 실패: \".concat(data.message));\n            }\n        } catch (error) {\n            console.error(\"투표 생성 중 오류 발생:\", error);\n            alert(\"투표 생성 중 오류가 발생했습니다.\");\n        }\n    };\n    const handleVote = async (voteId, choice)=>{\n        try {\n            const response = await fetch(\"/api/vote/cast\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(localStorage.getItem(\"token\"))\n                },\n                body: JSON.stringify({\n                    voteId,\n                    choice\n                })\n            });\n            const data = await response.json();\n            if (response.ok) {\n                alert(\"투표가 완료되었습니다.\");\n                fetchVotes();\n            } else {\n                alert(\"투표 실패: \".concat(data.message));\n            }\n        } catch (error) {\n            console.error(\"투표 중 오류 발생:\", error);\n            alert(\"투표 중 오류가 발생했습니다.\");\n        }\n    };\n    const groupMembersByPosition = ()=>{\n        if (!team || !team.members || !Array.isArray(team.members)) {\n            return {};\n        }\n        const grouped = {};\n        positionOrder.forEach((pos)=>{\n            grouped[pos] = team.members.filter((m)=>m.position && m.position.split(\",\").includes(pos));\n        });\n        return grouped;\n    };\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"로딩 중...\"\n        }, void 0, false, {\n            fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n            lineNumber: 138,\n            columnNumber: 12\n        }, this);\n    }\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                \"에러: \",\n                error\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n            lineNumber: 142,\n            columnNumber: 12\n        }, this);\n    }\n    if (!team) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"팀 정보를 찾을 수 없습니다.\"\n        }, void 0, false, {\n            fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n            lineNumber: 146,\n            columnNumber: 12\n        }, this);\n    }\n    const groupedMembers = groupMembersByPosition();\n    const manager = team.members ? team.members.find((member)=>member.role === \"감독\") : null;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen py-8 bg-gray-100\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"container px-4 mx-auto\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"overflow-hidden bg-white rounded-lg shadow-lg\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"p-6\",\n                    children: team ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                className: \"mb-4 text-2xl font-bold\",\n                                children: team.teamName\n                            }, void 0, false, {\n                                fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n                                lineNumber: 159,\n                                columnNumber: 17\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"mb-2 text-gray-600\",\n                                children: [\n                                    \"팀 코드: \",\n                                    team.teamCode\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n                                lineNumber: 160,\n                                columnNumber: 17\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"mb-4 text-gray-600\",\n                                children: [\n                                    \"감독: \",\n                                    manager ? manager.name : \"없음\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n                                lineNumber: 161,\n                                columnNumber: 17\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                className: \"mb-2 text-xl font-semibold\",\n                                children: [\n                                    \"멤버 수: \",\n                                    team.members ? team.members.length : 0\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n                                lineNumber: 162,\n                                columnNumber: 17\n                            }, this)\n                        ]\n                    }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: \"팀 정보를 불러오는 중...\"\n                    }, void 0, false, {\n                        fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n                        lineNumber: 166,\n                        columnNumber: 15\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n                    lineNumber: 156,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n                lineNumber: 155,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n            lineNumber: 154,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/jongyoonkim/my-soccer/pages/team/[teamId].js\",\n        lineNumber: 153,\n        columnNumber: 5\n    }, this);\n}\n_s(TeamDetail, \"YY0LwcthK/8I4sPb3cejLpHZk18=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = TeamDetail;\nvar _c;\n$RefreshReg$(_c, \"TeamDetail\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy90ZWFtL1t0ZWFtSWRdLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBQ1g7QUFDWDtBQUU3QixNQUFNSyxnQkFBZ0I7SUFBQztJQUFNO0lBQU07SUFBTTtJQUFNO0lBQU87SUFBTTtJQUFPO0lBQU07SUFBTTtDQUFLO0FBRXJFLFNBQVNDOztJQUN0QixNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR04sK0NBQVFBLENBQUM7SUFDakMsTUFBTSxDQUFDTyxTQUFTQyxXQUFXLEdBQUdSLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ1MsT0FBT0MsU0FBUyxHQUFHViwrQ0FBUUEsQ0FBQztJQUNuQyxNQUFNLENBQUNXLE9BQU9DLFNBQVMsR0FBR1osK0NBQVFBLENBQUMsRUFBRTtJQUNyQyxNQUFNLENBQUNhLGNBQWNDLGdCQUFnQixHQUFHZCwrQ0FBUUEsQ0FBQztJQUNqRCxNQUFNLENBQUNlLFdBQVdDLGFBQWEsR0FBR2hCLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ2lCLFVBQVVDLFlBQVksR0FBR2xCLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQ21CLFVBQVVDLFlBQVksR0FBR3BCLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQ3FCLGNBQWNDLGdCQUFnQixHQUFHdEIsK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDdUIsVUFBVUMsWUFBWSxHQUFHeEIsK0NBQVFBLENBQUM7SUFDekMsTUFBTXlCLFNBQVN4QixzREFBU0E7SUFDeEIsTUFBTSxFQUFFeUIsTUFBTSxFQUFFLEdBQUdELE9BQU9FLEtBQUs7SUFFL0I1QixnREFBU0EsQ0FBQztRQUNSLElBQUkyQixRQUFRO1lBQ1ZFO1lBQ0FDO1FBQ0Y7SUFDRixHQUFHO1FBQUNIO0tBQU87SUFFWCxNQUFNRSxtQkFBbUI7UUFDdkIsSUFBSTtZQUNGLE1BQU1FLFdBQVcsTUFBTUMsTUFBTSxhQUFvQixPQUFQTCxTQUFVO2dCQUNsRE0sU0FBUztvQkFDUEMsZUFBZSxVQUF3QyxPQUE5QkMsYUFBYUMsT0FBTyxDQUFDO2dCQUNoRDtZQUNGO1lBQ0EsTUFBTUMsT0FBTyxNQUFNTixTQUFTTyxJQUFJO1lBQ2hDLElBQUlQLFNBQVNRLEVBQUUsRUFBRTtnQkFDZkMsUUFBUUMsR0FBRyxDQUFDLHNCQUFzQko7Z0JBQ2xDOUIsUUFBUThCO2dCQUNSWixZQUFZWSxLQUFLYixRQUFRO1lBQzNCLE9BQU87Z0JBQ0xiLFNBQVMsdUJBQW9DLE9BQWIwQixLQUFLSyxPQUFPO1lBQzlDO1FBQ0YsRUFBRSxPQUFPaEMsT0FBTztZQUNkQyxTQUFTLDRCQUEwQyxPQUFkRCxNQUFNZ0MsT0FBTztRQUNwRCxTQUFVO1lBQ1JqQyxXQUFXO1FBQ2I7SUFDRjtJQUVBLE1BQU1xQixhQUFhO1FBQ2pCLElBQUk7WUFDRixNQUFNQyxXQUFXLE1BQU1DLE1BQU0seUJBQWdDLE9BQVBMLFNBQVU7Z0JBQzlETSxTQUFTO29CQUNQQyxlQUFlLFVBQXdDLE9BQTlCQyxhQUFhQyxPQUFPLENBQUM7Z0JBQ2hEO1lBQ0Y7WUFDQSxNQUFNQyxPQUFPLE1BQU1OLFNBQVNPLElBQUk7WUFDaEMsSUFBSVAsU0FBU1EsRUFBRSxFQUFFO2dCQUNmMUIsU0FBU3dCO1lBQ1gsT0FBTztnQkFDTEcsUUFBUTlCLEtBQUssQ0FBQyx3QkFBd0IyQixLQUFLSyxPQUFPO1lBQ3BEO1FBQ0YsRUFBRSxPQUFPaEMsT0FBTztZQUNkOEIsUUFBUTlCLEtBQUssQ0FBQyw2QkFBNkJBO1FBQzdDO0lBQ0Y7SUFFQSxNQUFNaUMsbUJBQW1CLE9BQU9DO1FBQzlCQSxFQUFFQyxjQUFjO1FBQ2hCLElBQUk7WUFDRixNQUFNZCxXQUFXLE1BQU1DLE1BQU0sb0JBQW9CO2dCQUMvQ2MsUUFBUTtnQkFDUmIsU0FBUztvQkFDUCxnQkFBZ0I7b0JBQ2hCQyxlQUFlLFVBQXdDLE9BQTlCQyxhQUFhQyxPQUFPLENBQUM7Z0JBQ2hEO2dCQUNBVyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7b0JBQ25CdEI7b0JBQ0F1QixPQUFPbEM7b0JBQ1BtQyxNQUFNakM7b0JBQ05rQyxNQUFNaEM7b0JBQ05pQyxVQUFVL0I7Z0JBQ1o7WUFDRjtZQUNBLE1BQU1lLE9BQU8sTUFBTU4sU0FBU08sSUFBSTtZQUNoQyxJQUFJUCxTQUFTUSxFQUFFLEVBQUU7Z0JBQ2ZlLE1BQU07Z0JBQ052QyxnQkFBZ0I7Z0JBQ2hCZTtnQkFDQWIsYUFBYTtnQkFDYkUsWUFBWTtnQkFDWkUsWUFBWTtnQkFDWkUsZ0JBQWdCO1lBQ2xCLE9BQU87Z0JBQ0wrQixNQUFNLGFBQTBCLE9BQWJqQixLQUFLSyxPQUFPO1lBQ2pDO1FBQ0YsRUFBRSxPQUFPaEMsT0FBTztZQUNkOEIsUUFBUTlCLEtBQUssQ0FBQyxrQkFBa0JBO1lBQ2hDNEMsTUFBTTtRQUNSO0lBQ0Y7SUFFQSxNQUFNQyxhQUFhLE9BQU9DLFFBQVFDO1FBQ2hDLElBQUk7WUFDRixNQUFNMUIsV0FBVyxNQUFNQyxNQUFNLGtCQUFrQjtnQkFDN0NjLFFBQVE7Z0JBQ1JiLFNBQVM7b0JBQ1AsZ0JBQWdCO29CQUNoQkMsZUFBZSxVQUF3QyxPQUE5QkMsYUFBYUMsT0FBTyxDQUFDO2dCQUNoRDtnQkFDQVcsTUFBTUMsS0FBS0MsU0FBUyxDQUFDO29CQUFFTztvQkFBUUM7Z0JBQU87WUFDeEM7WUFDQSxNQUFNcEIsT0FBTyxNQUFNTixTQUFTTyxJQUFJO1lBQ2hDLElBQUlQLFNBQVNRLEVBQUUsRUFBRTtnQkFDZmUsTUFBTTtnQkFDTnhCO1lBQ0YsT0FBTztnQkFDTHdCLE1BQU0sVUFBdUIsT0FBYmpCLEtBQUtLLE9BQU87WUFDOUI7UUFDRixFQUFFLE9BQU9oQyxPQUFPO1lBQ2Q4QixRQUFROUIsS0FBSyxDQUFDLGVBQWVBO1lBQzdCNEMsTUFBTTtRQUNSO0lBQ0Y7SUFFQSxNQUFNSSx5QkFBeUI7UUFDN0IsSUFBSSxDQUFDcEQsUUFBUSxDQUFDQSxLQUFLcUQsT0FBTyxJQUFJLENBQUNDLE1BQU1DLE9BQU8sQ0FBQ3ZELEtBQUtxRCxPQUFPLEdBQUc7WUFDMUQsT0FBTyxDQUFDO1FBQ1Y7UUFDQSxNQUFNRyxVQUFVLENBQUM7UUFDakIxRCxjQUFjMkQsT0FBTyxDQUFDQyxDQUFBQTtZQUNwQkYsT0FBTyxDQUFDRSxJQUFJLEdBQUcxRCxLQUFLcUQsT0FBTyxDQUFDTSxNQUFNLENBQUNDLENBQUFBLElBQUtBLEVBQUVDLFFBQVEsSUFBSUQsRUFBRUMsUUFBUSxDQUFDQyxLQUFLLENBQUMsS0FBS0MsUUFBUSxDQUFDTDtRQUN2RjtRQUNBLE9BQU9GO0lBQ1Q7SUFFQSxJQUFJdEQsU0FBUztRQUNYLHFCQUFPLDhEQUFDOEQ7c0JBQUk7Ozs7OztJQUNkO0lBRUEsSUFBSTVELE9BQU87UUFDVCxxQkFBTyw4REFBQzREOztnQkFBSTtnQkFBSzVEOzs7Ozs7O0lBQ25CO0lBRUEsSUFBSSxDQUFDSixNQUFNO1FBQ1QscUJBQU8sOERBQUNnRTtzQkFBSTs7Ozs7O0lBQ2Q7SUFFQSxNQUFNQyxpQkFBaUJiO0lBQ3ZCLE1BQU1jLFVBQVVsRSxLQUFLcUQsT0FBTyxHQUFHckQsS0FBS3FELE9BQU8sQ0FBQ2MsSUFBSSxDQUFDQyxDQUFBQSxTQUFVQSxPQUFPQyxJQUFJLEtBQUssUUFBUTtJQUVuRixxQkFDRSw4REFBQ0w7UUFBSU0sV0FBVTtrQkFDYiw0RUFBQ047WUFBSU0sV0FBVTtzQkFDYiw0RUFBQ047Z0JBQUlNLFdBQVU7MEJBQ2IsNEVBQUNOO29CQUFJTSxXQUFVOzhCQUNadEUscUJBQ0M7OzBDQUNFLDhEQUFDdUU7Z0NBQUdELFdBQVU7MENBQTJCdEUsS0FBS3dFLFFBQVE7Ozs7OzswQ0FDdEQsOERBQUNDO2dDQUFFSCxXQUFVOztvQ0FBcUI7b0NBQU90RSxLQUFLMEUsUUFBUTs7Ozs7OzswQ0FDdEQsOERBQUNEO2dDQUFFSCxXQUFVOztvQ0FBcUI7b0NBQUtKLFVBQVVBLFFBQVFTLElBQUksR0FBRzs7Ozs7OzswQ0FDaEUsOERBQUNDO2dDQUFHTixXQUFVOztvQ0FBNkI7b0NBQU90RSxLQUFLcUQsT0FBTyxHQUFHckQsS0FBS3FELE9BQU8sQ0FBQ3dCLE1BQU0sR0FBRzs7Ozs7Ozs7cURBSXpGLDhEQUFDSjtrQ0FBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPakI7R0F0S3dCMUU7O1FBV1BILGtEQUFTQTs7O0tBWEZHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL3RlYW0vW3RlYW1JZF0uanM/MjgyOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5cbmNvbnN0IHBvc2l0aW9uT3JkZXIgPSBbJ0dLJywgJ0NCJywgJ0xCJywgJ1JCJywgJ0NETScsICdDTScsICdDQU0nLCAnTFcnLCAnU1QnLCAnUlcnXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGVhbURldGFpbCgpIHtcbiAgY29uc3QgW3RlYW0sIHNldFRlYW1dID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbdm90ZXMsIHNldFZvdGVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3Nob3dWb3RlRm9ybSwgc2V0U2hvd1ZvdGVGb3JtXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3ZvdGVUaXRsZSwgc2V0Vm90ZVRpdGxlXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3ZvdGVEYXRlLCBzZXRWb3RlRGF0ZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFt2b3RlVGltZSwgc2V0Vm90ZVRpbWVdID0gdXNlU3RhdGUoJzEyOjAwJyk7XG4gIGNvbnN0IFt2b3RlTG9jYXRpb24sIHNldFZvdGVMb2NhdGlvbl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFt1c2VyUm9sZSwgc2V0VXNlclJvbGVdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCB7IHRlYW1JZCB9ID0gcm91dGVyLnF1ZXJ5O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHRlYW1JZCkge1xuICAgICAgZmV0Y2hUZWFtRGV0YWlscygpO1xuICAgICAgZmV0Y2hWb3RlcygpO1xuICAgIH1cbiAgfSwgW3RlYW1JZF0pO1xuXG4gIGNvbnN0IGZldGNoVGVhbURldGFpbHMgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hcGkvdGVhbS8ke3RlYW1JZH1gLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKX1gLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdGZXRjaGVkIHRlYW0gZGF0YTonLCBkYXRhKTtcbiAgICAgICAgc2V0VGVhbShkYXRhKTtcbiAgICAgICAgc2V0VXNlclJvbGUoZGF0YS51c2VyUm9sZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRFcnJvcihg7YyAIOygleuztOulvCDrtojrn6zsmKTripTrjbAg7Iuk7Yyo7ZaI7Iq164uI64ukOiAke2RhdGEubWVzc2FnZX1gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0RXJyb3IoYO2MgCDsoJXrs7Trpbwg67aI65+s7Jik64qUIOykkSDsmKTrpZjqsIAg67Cc7IOd7ZaI7Iq164uI64ukOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmZXRjaFZvdGVzID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL3ZvdGUvbGlzdD90ZWFtSWQ9JHt0ZWFtSWR9YCwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIil9YCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBzZXRWb3RlcyhkYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ+2IrO2RnCDrqqnroZ3snYQg67aI65+s7Jik64qU642wIOyLpO2MqO2WiOyKteuLiOuLpDonLCBkYXRhLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCftiKztkZwg66qp66Gd7J2EIOu2iOufrOyYpOuKlCDspJEg7Jik66WY6rCAIOuwnOyDne2WiOyKteuLiOuLpDonLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNyZWF0ZVZvdGUgPSBhc3luYyAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS92b3RlL2NyZWF0ZScsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpfWAsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICB0ZWFtSWQsXG4gICAgICAgICAgdGl0bGU6IHZvdGVUaXRsZSxcbiAgICAgICAgICBkYXRlOiB2b3RlRGF0ZSxcbiAgICAgICAgICB0aW1lOiB2b3RlVGltZSxcbiAgICAgICAgICBsb2NhdGlvbjogdm90ZUxvY2F0aW9uLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBhbGVydCgn7Yis7ZGc6rCAIOyDneyEseuQmOyXiOyKteuLiOuLpC4nKTtcbiAgICAgICAgc2V0U2hvd1ZvdGVGb3JtKGZhbHNlKTtcbiAgICAgICAgZmV0Y2hWb3RlcygpO1xuICAgICAgICBzZXRWb3RlVGl0bGUoJycpO1xuICAgICAgICBzZXRWb3RlRGF0ZSgnJyk7XG4gICAgICAgIHNldFZvdGVUaW1lKCcxMjowMCcpO1xuICAgICAgICBzZXRWb3RlTG9jYXRpb24oJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQoYO2IrO2RnCDsg53shLEg7Iuk7YyoOiAke2RhdGEubWVzc2FnZX1gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcign7Yis7ZGcIOyDneyEsSDspJEg7Jik66WYIOuwnOyDnTonLCBlcnJvcik7XG4gICAgICBhbGVydCgn7Yis7ZGcIOyDneyEsSDspJEg7Jik66WY6rCAIOuwnOyDne2WiOyKteuLiOuLpC4nKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVm90ZSA9IGFzeW5jICh2b3RlSWQsIGNob2ljZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL3ZvdGUvY2FzdCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpfWAsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdm90ZUlkLCBjaG9pY2UgfSksXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgYWxlcnQoJ+2IrO2RnOqwgCDsmYTro4zrkJjsl4jsirXri4jri6QuJyk7XG4gICAgICAgIGZldGNoVm90ZXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KGDtiKztkZwg7Iuk7YyoOiAke2RhdGEubWVzc2FnZX1gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcign7Yis7ZGcIOykkSDsmKTrpZgg67Cc7IOdOicsIGVycm9yKTtcbiAgICAgIGFsZXJ0KCftiKztkZwg7KSRIOyYpOulmOqwgCDrsJzsg53tlojsirXri4jri6QuJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdyb3VwTWVtYmVyc0J5UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgaWYgKCF0ZWFtIHx8ICF0ZWFtLm1lbWJlcnMgfHwgIUFycmF5LmlzQXJyYXkodGVhbS5tZW1iZXJzKSkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBjb25zdCBncm91cGVkID0ge307XG4gICAgcG9zaXRpb25PcmRlci5mb3JFYWNoKHBvcyA9PiB7XG4gICAgICBncm91cGVkW3Bvc10gPSB0ZWFtLm1lbWJlcnMuZmlsdGVyKG0gPT4gbS5wb3NpdGlvbiAmJiBtLnBvc2l0aW9uLnNwbGl0KCcsJykuaW5jbHVkZXMocG9zKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGdyb3VwZWQ7XG4gIH07XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gPGRpdj7roZzrlKkg7KSRLi4uPC9kaXY+O1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIDxkaXY+7JeQ65+sOiB7ZXJyb3J9PC9kaXY+O1xuICB9XG5cbiAgaWYgKCF0ZWFtKSB7XG4gICAgcmV0dXJuIDxkaXY+7YyAIOygleuztOulvCDssL7snYQg7IiYIOyXhuyKteuLiOuLpC48L2Rpdj47XG4gIH1cblxuICBjb25zdCBncm91cGVkTWVtYmVycyA9IGdyb3VwTWVtYmVyc0J5UG9zaXRpb24oKTtcbiAgY29uc3QgbWFuYWdlciA9IHRlYW0ubWVtYmVycyA/IHRlYW0ubWVtYmVycy5maW5kKG1lbWJlciA9PiBtZW1iZXIucm9sZSA9PT0gJ+qwkOuPhScpIDogbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIHB5LTggYmctZ3JheS0xMDBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHB4LTQgbXgtYXV0b1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm92ZXJmbG93LWhpZGRlbiBiZy13aGl0ZSByb3VuZGVkLWxnIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02XCI+XG4gICAgICAgICAgICB7dGVhbSA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwibWItNCB0ZXh0LTJ4bCBmb250LWJvbGRcIj57dGVhbS50ZWFtTmFtZX08L2gyPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1iLTIgdGV4dC1ncmF5LTYwMFwiPu2MgCDsvZTrk5w6IHt0ZWFtLnRlYW1Db2RlfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtYi00IHRleHQtZ3JheS02MDBcIj7qsJDrj4U6IHttYW5hZ2VyID8gbWFuYWdlci5uYW1lIDogJ+yXhuydjCd9PC9wPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJtYi0yIHRleHQteGwgZm9udC1zZW1pYm9sZFwiPuuppOuyhCDsiJg6IHt0ZWFtLm1lbWJlcnMgPyB0ZWFtLm1lbWJlcnMubGVuZ3RoIDogMH08L2gzPlxuICAgICAgICAgICAgICAgIHsvKiDrgpjrqLjsp4Ag7YyAIOygleuztCDroIzrjZTrp4EgKi99XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPHA+7YyAIOygleuztOulvCDrtojrn6zsmKTripQg7KSRLi4uPC9wPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkxpbmsiLCJwb3NpdGlvbk9yZGVyIiwiVGVhbURldGFpbCIsInRlYW0iLCJzZXRUZWFtIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwidm90ZXMiLCJzZXRWb3RlcyIsInNob3dWb3RlRm9ybSIsInNldFNob3dWb3RlRm9ybSIsInZvdGVUaXRsZSIsInNldFZvdGVUaXRsZSIsInZvdGVEYXRlIiwic2V0Vm90ZURhdGUiLCJ2b3RlVGltZSIsInNldFZvdGVUaW1lIiwidm90ZUxvY2F0aW9uIiwic2V0Vm90ZUxvY2F0aW9uIiwidXNlclJvbGUiLCJzZXRVc2VyUm9sZSIsInJvdXRlciIsInRlYW1JZCIsInF1ZXJ5IiwiZmV0Y2hUZWFtRGV0YWlscyIsImZldGNoVm90ZXMiLCJyZXNwb25zZSIsImZldGNoIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZGF0YSIsImpzb24iLCJvayIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwiaGFuZGxlQ3JlYXRlVm90ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGl0bGUiLCJkYXRlIiwidGltZSIsImxvY2F0aW9uIiwiYWxlcnQiLCJoYW5kbGVWb3RlIiwidm90ZUlkIiwiY2hvaWNlIiwiZ3JvdXBNZW1iZXJzQnlQb3NpdGlvbiIsIm1lbWJlcnMiLCJBcnJheSIsImlzQXJyYXkiLCJncm91cGVkIiwiZm9yRWFjaCIsInBvcyIsImZpbHRlciIsIm0iLCJwb3NpdGlvbiIsInNwbGl0IiwiaW5jbHVkZXMiLCJkaXYiLCJncm91cGVkTWVtYmVycyIsIm1hbmFnZXIiLCJmaW5kIiwibWVtYmVyIiwicm9sZSIsImNsYXNzTmFtZSIsImgyIiwidGVhbU5hbWUiLCJwIiwidGVhbUNvZGUiLCJuYW1lIiwiaDMiLCJsZW5ndGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/team/[teamId].js\n"));

/***/ })

});