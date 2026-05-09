'use client'
import { useState, useEffect, useCallback } from 'react'

const TOPICS = ['All', 'Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'Sorting'] as const
type Topic = typeof TOPICS[number]
type Diff = 'easy' | 'medium' | 'hard'

interface Question { id: number; topic: string; difficulty: Diff; title: string; description: string; options: string[]; answer: number; points: number }
interface Player { name: string; score: number; solved: number; avatar: string }

const QUESTIONS: Question[] = [
  { id:1, topic:'Arrays', difficulty:'easy', title:'Two Sum', description:'Given an array [2,7,11,15] and target 9, which pair sums to 9?', options:['(2,7)','(7,11)','(11,15)','(2,15)'], answer:0, points:10 },
  { id:2, topic:'Arrays', difficulty:'medium', title:'Maximum Subarray', description:'What algorithm finds the maximum sum contiguous subarray in O(n)?', options:['Merge Sort','Binary Search','Kadane\'s Algorithm','Two Pointer'], answer:2, points:20 },
  { id:3, topic:'Strings', difficulty:'easy', title:'Reverse String', description:'What is the time complexity of reversing a string of length n?', options:['O(1)','O(log n)','O(n)','O(n²)'], answer:2, points:10 },
  { id:4, topic:'Strings', difficulty:'medium', title:'Longest Palindrome', description:'Which technique is used for longest palindromic substring in O(n)?', options:['Brute Force','Manacher\'s Algorithm','KMP','Rabin-Karp'], answer:1, points:20 },
  { id:5, topic:'Trees', difficulty:'easy', title:'Tree Traversal', description:'Which traversal visits: Left → Root → Right?', options:['Preorder','Postorder','Inorder','Level-order'], answer:2, points:10 },
  { id:6, topic:'Trees', difficulty:'hard', title:'Lowest Common Ancestor', description:'LCA of nodes 4 and 6 in BST [5,3,7,2,4,6,8] is?', options:['3','5','7','2'], answer:1, points:30 },
  { id:7, topic:'Graphs', difficulty:'medium', title:'BFS vs DFS', description:'Which algorithm guarantees shortest path in an unweighted graph?', options:['DFS','BFS','Dijkstra','Bellman-Ford'], answer:1, points:20 },
  { id:8, topic:'Graphs', difficulty:'hard', title:'Dijkstra Complexity', description:'Time complexity of Dijkstra with a min-heap and adjacency list?', options:['O(V²)','O(E log V)','O(V+E)','O(V·E)'], answer:1, points:30 },
  { id:9, topic:'DP', difficulty:'medium', title:'Fibonacci', description:'What is the time complexity of memoized Fibonacci?', options:['O(2^n)','O(n²)','O(n)','O(log n)'], answer:2, points:20 },
  { id:10, topic:'DP', difficulty:'hard', title:'0/1 Knapsack', description:'Space-optimized 0/1 Knapsack uses how many rows?', options:['n rows','W columns only','1 row','2 rows'], answer:2, points:30 },
  { id:11, topic:'Sorting', difficulty:'easy', title:'Bubble Sort', description:'Best-case time complexity of optimized Bubble Sort?', options:['O(n²)','O(n log n)','O(n)','O(1)'], answer:2, points:10 },
  { id:12, topic:'Sorting', difficulty:'medium', title:'Quick Sort Pivot', description:'Worst case of Quick Sort occurs when pivot is always?', options:['Median','Random','Smallest/Largest','Middle'], answer:2, points:20 },
]

const INITIAL_PLAYERS: Player[] = [
  { name:'Aarav Sharma', score:280, solved:14, avatar:'A' },
  { name:'Kavya Singh', score:240, solved:12, avatar:'K' },
  { name:'Rohan Mehra', score:190, solved:10, avatar:'R' },
  { name:'Priya Patel', score:150, solved:8, avatar:'P' },
  { name:'Nitesh Dangi', score:120, solved:6, avatar:'N' },
]

const DIFF_CFG: Record<Diff, {color:string; bg:string}> = {
  easy: { color:'#4ade80', bg:'rgba(74,222,128,0.1)' },
  medium: { color:'#d7c4a6', bg:'rgba(215,196,166,0.1)' },
  hard: { color:'#f87171', bg:'rgba(248,113,113,0.1)' },
}

export default function LivePage() {
  const [topic, setTopic] = useState<Topic>('All')
  const [current, setCurrent] = useState<Question|null>(null)
  const [selected, setSelected] = useState<number|null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [solved, setSolved] = useState(0)
  const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set())
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS)
  const [timer, setTimer] = useState(30)
  const [toast, setToast] = useState<string|null>(null)
  const [streak, setStreak] = useState(0)

  const filtered = QUESTIONS.filter(q => topic === 'All' || q.topic === topic)
  const available = filtered.filter(q => !solvedIds.has(q.id))

  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500) }, [])

  const startQuestion = useCallback((q: Question) => {
    setCurrent(q); setSelected(null); setAnswered(false); setTimer(30)
  }, [])

  // Timer
  useEffect(() => {
    if (!current || answered) return
    if (timer <= 0) { setAnswered(true); setStreak(0); showToast('Time\'s up! ⏰'); return }
    const t = setTimeout(() => setTimer(p => p - 1), 1000)
    return () => clearTimeout(t)
  }, [timer, current, answered, showToast])

  const submitAnswer = () => {
    if (selected === null || !current) return
    setAnswered(true)
    if (selected === current.answer) {
      const bonus = timer > 20 ? 5 : timer > 10 ? 3 : 0
      const pts = current.points + bonus
      setScore(s => s + pts)
      setSolved(s => s + 1)
      setSolvedIds(p => new Set(p).add(current.id))
      setStreak(s => s + 1)
      setPlayers(prev => {
        const updated = prev.map(p => p.name === 'You' ? { ...p, score: p.score + pts, solved: p.solved + 1 } : p)
        if (!updated.find(p => p.name === 'You')) updated.push({ name: 'You', score: pts, solved: 1, avatar: 'Y' })
        return updated.sort((a, b) => b.score - a.score)
      })
      showToast(`+${pts} points! ${bonus > 0 ? '⚡ Speed bonus!' : '✅ Correct!'}`)
    } else {
      setStreak(0)
      showToast('Wrong answer 😢')
    }
  }

  const yourRank = players.sort((a,b) => b.score - a.score).findIndex(p => p.name === 'You') + 1
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <div style={{ minHeight:'100vh', paddingTop:'90px', paddingBottom:'80px', position:'relative' }}>
      <style>{`@keyframes popIn{0%{opacity:0;transform:translateX(-50%) scale(0.9) translateY(8px)}100%{opacity:1;transform:translateX(-50%) scale(1) translateY(0)}}`}</style>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 24px' }}>

        {/* Hero */}
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'9999px', background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.15)', marginBottom:'20px' }}>
            <span className="material-symbols-outlined" style={{ fontSize:'16px', color:'#f87171' }}>bolt</span>
            <span style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'11px', fontWeight:600, color:'#f87171', letterSpacing:'0.12em', textTransform:'uppercase' }}>Live Challenge Arena</span>
          </div>
          <h1 style={{ fontFamily:'Sora,sans-serif', fontSize:'44px', fontWeight:600, color:'#e2e2e8', margin:'0 0 16px', letterSpacing:'-0.03em', lineHeight:1.15 }}>
            Solve. <span style={{ color:'#d7c4a6' }}>Score</span>. Climb.
          </h1>
          <p style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'17px', color:'#cfc5b9', lineHeight:1.65, margin:'0 auto 28px', maxWidth:'560px' }}>
            Test your DSA knowledge with timed challenges. Every correct answer updates the leaderboard in real-time.
          </p>
          {/* User Stats */}
          <div style={{ display:'flex', justifyContent:'center', gap:'24px', flexWrap:'wrap' }}>
            {[
              { icon:'stars', label:'Score', value: score, color:'#f3dfc0' },
              { icon:'check_circle', label:'Solved', value: solved, color:'#4ade80' },
              { icon:'local_fire_department', label:'Streak', value: streak, color:'#f87171' },
              { icon:'leaderboard', label:'Rank', value: yourRank || '—', color:'#82aaff' },
            ].map(s => (
              <div key={s.label} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize:'20px', color:s.color }}>{s.icon}</span>
                <div style={{ textAlign:'left' }}>
                  <div style={{ fontFamily:'Sora,sans-serif', fontSize:'20px', fontWeight:600, color:'#e2e2e8', lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'10px', color:'#7a756e' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Filter */}
        <div style={{ display:'flex', justifyContent:'center', gap:'4px', marginBottom:'32px', flexWrap:'wrap' }}>
          {TOPICS.map(t => (
            <button key={t} onClick={() => { setTopic(t); setCurrent(null) }} style={{
              fontFamily:'Sora,sans-serif', fontSize:'12px', fontWeight:500, padding:'7px 18px',
              borderRadius:'9999px', border:'none', cursor:'pointer', transition:'all 0.2s',
              color: topic === t ? '#f3dfc0' : '#7a756e',
              background: topic === t ? 'rgba(243,223,192,0.08)' : 'transparent',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display:'flex', gap:'28px', alignItems:'flex-start' }}>

          {/* Main Area */}
          <div style={{ flex:1, minWidth:0 }}>
            {!current ? (
              /* Question Grid */
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'14px' }}>
                {filtered.map(q => {
                  const done = solvedIds.has(q.id)
                  const dc = DIFF_CFG[q.difficulty]
                  return (
                    <div key={q.id} onClick={() => !done && startQuestion(q)} style={{
                      background: done ? 'rgba(74,222,128,0.04)' : 'rgba(22,24,28,0.5)',
                      border: `1px solid ${done ? 'rgba(74,222,128,0.15)' : 'rgba(243,223,192,0.06)'}`,
                      borderRadius:'14px', padding:'20px', cursor: done ? 'default' : 'pointer',
                      transition:'border-color 0.2s', opacity: done ? 0.6 : 1,
                    }}
                    onMouseEnter={e => { if (!done) e.currentTarget.style.borderColor = 'rgba(243,223,192,0.18)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = done ? 'rgba(74,222,128,0.15)' : 'rgba(243,223,192,0.06)' }}
                    >
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px' }}>
                        <span style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'11px', fontWeight:600, color:dc.color, padding:'3px 10px', borderRadius:'8px', background:dc.bg, textTransform:'capitalize' }}>{q.difficulty}</span>
                        <span style={{ fontFamily:'Sora,sans-serif', fontSize:'12px', fontWeight:600, color:'#d7c4a6' }}>+{q.points}pts</span>
                      </div>
                      <h3 style={{ fontFamily:'Sora,sans-serif', fontSize:'15px', fontWeight:600, color:'#e2e2e8', margin:'0 0 6px' }}>{q.title}</h3>
                      <span style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'11px', color:'#7a756e' }}>{q.topic}</span>
                      {done && <span className="material-symbols-outlined" style={{ fontSize:'16px', color:'#4ade80', float:'right' }}>check_circle</span>}
                    </div>
                  )
                })}
                {available.length === 0 && (
                  <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'40px', color:'#7a756e', fontFamily:'Hanken Grotesk,sans-serif', fontSize:'15px' }}>
                    🎉 All questions solved in this topic! Try another.
                  </div>
                )}
              </div>
            ) : (
              /* Active Question */
              <div style={{ background:'rgba(22,24,28,0.6)', border:'1px solid rgba(243,223,192,0.1)', borderRadius:'20px', padding:'32px' }}>
                {/* Header */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'11px', fontWeight:600, color:DIFF_CFG[current.difficulty].color, padding:'3px 10px', borderRadius:'8px', background:DIFF_CFG[current.difficulty].bg, textTransform:'capitalize' }}>{current.difficulty}</span>
                    <span style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'11px', color:'#7a756e' }}>{current.topic}</span>
                  </div>
                  {/* Timer */}
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', padding:'6px 14px', borderRadius:'10px', background: timer <= 10 ? 'rgba(248,113,113,0.1)' : 'rgba(243,223,192,0.06)', border:`1px solid ${timer <= 10 ? 'rgba(248,113,113,0.2)' : 'rgba(243,223,192,0.08)'}` }}>
                    <span className="material-symbols-outlined" style={{ fontSize:'16px', color: timer <= 10 ? '#f87171' : '#d7c4a6' }}>timer</span>
                    <span style={{ fontFamily:'Sora,sans-serif', fontSize:'16px', fontWeight:600, color: timer <= 10 ? '#f87171' : '#e2e2e8' }}>{timer}s</span>
                  </div>
                </div>

                <h2 style={{ fontFamily:'Sora,sans-serif', fontSize:'22px', fontWeight:600, color:'#e2e2e8', margin:'0 0 10px' }}>{current.title}</h2>
                <p style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'15px', color:'#cfc5b9', lineHeight:1.6, margin:'0 0 24px' }}>{current.description}</p>

                {/* Options */}
                <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'24px' }}>
                  {current.options.map((opt, i) => {
                    let bg = 'rgba(12,14,18,0.5)'
                    let border = 'rgba(243,223,192,0.06)'
                    let color = '#cfc5b9'
                    if (answered) {
                      if (i === current.answer) { bg = 'rgba(74,222,128,0.1)'; border = 'rgba(74,222,128,0.3)'; color = '#4ade80' }
                      else if (i === selected) { bg = 'rgba(248,113,113,0.1)'; border = 'rgba(248,113,113,0.3)'; color = '#f87171' }
                    } else if (i === selected) { bg = 'rgba(243,223,192,0.06)'; border = 'rgba(243,223,192,0.2)'; color = '#f3dfc0' }
                    return (
                      <button key={i} onClick={() => !answered && setSelected(i)} disabled={answered} style={{
                        display:'flex', alignItems:'center', gap:'12px', padding:'14px 18px',
                        borderRadius:'12px', border:`1px solid ${border}`, background:bg,
                        cursor: answered ? 'default' : 'pointer', transition:'all 0.2s', textAlign:'left',
                      }}>
                        <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:`${border}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontFamily:'Sora,sans-serif', fontSize:'12px', fontWeight:600, color }}>{String.fromCharCode(65+i)}</div>
                        <span style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'14px', color, lineHeight:1.4 }}>{opt}</span>
                        {answered && i === current.answer && <span className="material-symbols-outlined" style={{ marginLeft:'auto', fontSize:'18px', color:'#4ade80' }}>check_circle</span>}
                        {answered && i === selected && i !== current.answer && <span className="material-symbols-outlined" style={{ marginLeft:'auto', fontSize:'18px', color:'#f87171' }}>cancel</span>}
                      </button>
                    )
                  })}
                </div>

                {/* Actions */}
                <div style={{ display:'flex', gap:'12px', justifyContent:'flex-end' }}>
                  <button onClick={() => setCurrent(null)} style={{ padding:'10px 22px', borderRadius:'9999px', border:'1px solid rgba(243,223,192,0.1)', background:'transparent', color:'#988f85', fontFamily:'Sora,sans-serif', fontSize:'13px', fontWeight:500, cursor:'pointer' }}>Back</button>
                  {!answered ? (
                    <button onClick={submitAnswer} disabled={selected===null} style={{
                      padding:'10px 24px', borderRadius:'9999px', border:'none',
                      background: selected !== null ? 'linear-gradient(135deg,#f3dfc0,#d7c4a6)' : 'rgba(243,223,192,0.1)',
                      color: selected !== null ? '#111317' : '#7a756e',
                      fontFamily:'Sora,sans-serif', fontSize:'13px', fontWeight:600,
                      cursor: selected !== null ? 'pointer' : 'not-allowed',
                    }}>Submit Answer</button>
                  ) : (
                    <button onClick={() => { const next = available.filter(q=>q.id!==current.id)[0]; next ? startQuestion(next) : setCurrent(null) }} style={{
                      padding:'10px 24px', borderRadius:'9999px', border:'none',
                      background:'linear-gradient(135deg,#f3dfc0,#d7c4a6)', color:'#111317',
                      fontFamily:'Sora,sans-serif', fontSize:'13px', fontWeight:600, cursor:'pointer',
                    }}>Next Question →</button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Leaderboard Sidebar */}
          <div style={{ width:'280px', flexShrink:0, display:'flex', flexDirection:'column', gap:'16px' }}>

            <div style={{ background:'rgba(22,24,28,0.5)', border:'1px solid rgba(243,223,192,0.06)', borderRadius:'16px', padding:'20px' }}>
              <h4 style={{ fontFamily:'Sora,sans-serif', fontSize:'13px', fontWeight:600, color:'#e2e2e8', margin:'0 0 16px', display:'flex', alignItems:'center', gap:'6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize:'16px', color:'#f3dfc0' }}>leaderboard</span>
                Live Leaderboard
              </h4>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {sortedPlayers.map((p, i) => (
                  <div key={p.name} style={{
                    display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px',
                    borderRadius:'10px', transition:'all 0.4s ease',
                    background: p.name === 'You' ? 'rgba(74,222,128,0.08)' : i < 3 ? 'rgba(243,223,192,0.03)' : 'transparent',
                    border: p.name === 'You' ? '1px solid rgba(74,222,128,0.2)' : '1px solid transparent',
                  }}>
                    <span style={{ fontFamily:'Sora,sans-serif', fontSize:'13px', fontWeight:600, color: i < 3 ? '#f3dfc0' : '#7a756e', width:'20px' }}>
                      {i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}`}
                    </span>
                    <div style={{
                      width:'28px', height:'28px', borderRadius:'50%', flexShrink:0,
                      background: p.name === 'You' ? 'linear-gradient(135deg,rgba(74,222,128,0.2),rgba(74,222,128,0.08))' : 'linear-gradient(135deg,rgba(215,196,166,0.15),rgba(243,223,192,0.05))',
                      border: `1px solid ${p.name === 'You' ? 'rgba(74,222,128,0.2)' : 'rgba(243,223,192,0.1)'}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontFamily:'Sora,sans-serif', fontSize:'11px', fontWeight:600, color: p.name === 'You' ? '#4ade80' : '#d7c4a6',
                    }}>{p.avatar}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:'Sora,sans-serif', fontSize:'12px', fontWeight:600, color: p.name === 'You' ? '#4ade80' : '#e2e2e8' }}>{p.name}</div>
                      <div style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'10px', color:'#7a756e' }}>{p.solved} solved</div>
                    </div>
                    <span style={{ fontFamily:'Sora,sans-serif', fontSize:'14px', fontWeight:600, color:'#d7c4a6' }}>{p.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div style={{ background:'rgba(22,24,28,0.5)', border:'1px solid rgba(243,223,192,0.06)', borderRadius:'16px', padding:'20px' }}>
              <h4 style={{ fontFamily:'Sora,sans-serif', fontSize:'13px', fontWeight:600, color:'#e2e2e8', margin:'0 0 14px', display:'flex', alignItems:'center', gap:'6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize:'16px', color:'#4ade80' }}>trending_up</span>
                Your Progress
              </h4>
              <div style={{ width:'100%', height:'6px', borderRadius:'3px', background:'rgba(243,223,192,0.06)', marginBottom:'8px' }}>
                <div style={{ width:`${(solvedIds.size / QUESTIONS.length) * 100}%`, height:'100%', borderRadius:'3px', background:'linear-gradient(90deg,#4ade80,#d7c4a6)', transition:'width 0.5s ease' }} />
              </div>
              <span style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'11px', color:'#7a756e' }}>{solvedIds.size}/{QUESTIONS.length} questions completed</span>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position:'fixed', bottom:'32px', left:'50%', transform:'translateX(-50%)', padding:'12px 28px', borderRadius:'12px', zIndex:9999, background:'rgba(22,24,28,0.95)', border:'1px solid rgba(243,223,192,0.15)', backdropFilter:'blur(16px)', boxShadow:'0 8px 32px rgba(0,0,0,0.4)', animation:'popIn 0.3s ease-out' }}>
          <span style={{ fontFamily:'Hanken Grotesk,sans-serif', fontSize:'14px', color:'#f3dfc0' }}>{toast}</span>
        </div>
      )}
    </div>
  )
}
