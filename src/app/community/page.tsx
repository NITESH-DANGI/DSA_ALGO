'use client'
import { useState } from 'react'
import Link from 'next/link'

/* ── Discussion Data ── */
const DISCUSSIONS = [
  {
    id: 1,
    author: 'Nitesh Dangi',
    avatar: 'N',
    role: 'Creator',
    roleColor: '#f3dfc0',
    time: '2 hours ago',
    title: 'Welcome to AlgoFlow Community! 🎉',
    body: 'Hey everyone! This is the official community space for AlgoFlow. Share your DSA journey, ask questions, and help each other grow. Let\'s build something amazing together.',
    tags: ['announcement', 'welcome'],
    likes: 42,
    replies: 18,
    pinned: true,
  },
  {
    id: 2,
    author: 'Aarav Sharma',
    avatar: 'A',
    role: 'Pro',
    roleColor: '#4ade80',
    time: '5 hours ago',
    title: 'How I cracked Google with AlgoFlow\'s Roadmap',
    body: 'Followed the 8-phase roadmap religiously for 4 months. The graph visualization was a game-changer for understanding BFS/DFS. Here\'s my full strategy...',
    tags: ['success-story', 'interview'],
    likes: 128,
    replies: 34,
    pinned: false,
  },
  {
    id: 3,
    author: 'Priya Patel',
    avatar: 'P',
    role: 'Member',
    roleColor: '#988f85',
    time: '1 day ago',
    title: 'Can someone explain Dijkstra vs Bellman-Ford?',
    body: 'I understand both find shortest paths, but when should I use which? The AlgoFlow visualizer helps but I want to understand the theory better.',
    tags: ['question', 'graphs'],
    likes: 23,
    replies: 12,
    pinned: false,
  },
  {
    id: 4,
    author: 'Rohan Mehra',
    avatar: 'R',
    role: 'Contributor',
    roleColor: '#82aaff',
    time: '2 days ago',
    title: 'Feature Request: Add Heap Sort visualization',
    body: 'Would love to see a heap sort visualization with the binary heap tree structure shown alongside the array. Anyone else interested?',
    tags: ['feature-request', 'sorting'],
    likes: 56,
    replies: 8,
    pinned: false,
  },
  {
    id: 5,
    author: 'Kavya Singh',
    avatar: 'K',
    role: 'Member',
    roleColor: '#988f85',
    time: '3 days ago',
    title: 'My 30-day DSA challenge progress 📊',
    body: 'Day 15 update: Completed arrays, strings, and now deep into linked lists. The AlgoFlow visualizer makes reversing a linked list so much clearer!',
    tags: ['progress', 'challenge'],
    likes: 89,
    replies: 21,
    pinned: false,
  },
]

/* ── Leaderboard Data ── */
const LEADERBOARD = [
  { rank: 1, name: 'Aarav Sharma', problems: 342, streak: 45, badge: '🏆' },
  { rank: 2, name: 'Kavya Singh', problems: 289, streak: 30, badge: '🥈' },
  { rank: 3, name: 'Rohan Mehra', problems: 256, streak: 28, badge: '🥉' },
  { rank: 4, name: 'Priya Patel', problems: 198, streak: 15, badge: '⭐' },
  { rank: 5, name: 'Nitesh Dangi', problems: 180, streak: 60, badge: '🔥' },
]

/* ── Community Stats ── */
const STATS = [
  { icon: 'group', value: '2.4K+', label: 'Members', color: '#f3dfc0' },
  { icon: 'forum', value: '580+', label: 'Discussions', color: '#4ade80' },
  { icon: 'emoji_events', value: '120+', label: 'Success Stories', color: '#d7c4a6' },
  { icon: 'code', value: '15K+', label: 'Problems Solved', color: '#82aaff' },
]

/* ── Tag Color Map ── */
const TAG_COLORS: Record<string, string> = {
  'announcement': '#f3dfc0',
  'welcome': '#4ade80',
  'success-story': '#82aaff',
  'interview': '#c792ea',
  'question': '#f87171',
  'graphs': '#4ade80',
  'feature-request': '#ffb86c',
  'sorting': '#d7c4a6',
  'progress': '#82aaff',
  'challenge': '#c792ea',
}

interface Post {
  id: number
  author: string
  avatar: string
  role: string
  roleColor: string
  time: string
  title: string
  body: string
  tags: string[]
  likes: number
  replies: number
  pinned: boolean
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'discussions' | 'leaderboard'>('discussions')
  const [posts, setPosts] = useState<Post[]>(DISCUSSIONS)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set())
  const [replyOpen, setReplyOpen] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: likedPosts.has(id) ? p.likes - 1 : p.likes + 1 } : p))
  }

  const toggleSave = (id: number) => {
    setSavedPosts(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id); showToast('Removed from saved') } else { next.add(id); showToast('Saved to bookmarks ✨') }
      return next
    })
  }

  const handleShare = (title: string) => {
    navigator.clipboard?.writeText(`Check out "${title}" on AlgoFlow Community!`)
    showToast('Link copied to clipboard! 📋')
  }

  const handleReply = (id: number) => {
    if (!replyText.trim()) return
    setPosts(prev => prev.map(p => p.id === id ? { ...p, replies: p.replies + 1 } : p))
    setReplyText('')
    setReplyOpen(null)
    showToast('Reply posted! 💬')
  }

  const handleNewPost = () => {
    if (!newTitle.trim() || !newBody.trim()) return
    const newPost: Post = {
      id: Date.now(),
      author: 'You',
      avatar: 'Y',
      role: 'Member',
      roleColor: '#4ade80',
      time: 'Just now',
      title: newTitle,
      body: newBody,
      tags: ['discussion'],
      likes: 0,
      replies: 0,
      pinned: false,
    }
    setPosts(prev => [newPost, ...prev])
    setNewTitle('')
    setNewBody('')
    showToast('Post published! 🚀')
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px', paddingBottom: '80px', position: 'relative' }}>

      {/* Glow effects */}
      <div style={{
        position: 'absolute', top: '10%', left: '5%', width: '35vw', height: '35vw',
        background: 'radial-gradient(circle, rgba(215,196,166,0.03) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '5%', width: '25vw', height: '25vw',
        background: 'radial-gradient(circle, rgba(74,222,128,0.02) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '9999px',
            background: 'rgba(243,223,192,0.06)', border: '1px solid rgba(243,223,192,0.12)',
            marginBottom: '20px',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>groups</span>
            <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 600, color: '#f3dfc0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Community Hub
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Sora, sans-serif', fontSize: '44px', fontWeight: 600,
            color: '#e2e2e8', margin: '0 0 16px 0', letterSpacing: '-0.03em', lineHeight: 1.15,
          }}>
            Learn <span style={{ color: '#d7c4a6' }}>Together</span>, Grow Together
          </h1>

          <p style={{
            fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '17px',
            color: '#cfc5b9', lineHeight: 1.65, margin: '0 auto 32px auto', maxWidth: '580px',
          }}>
            Join thousands of developers on their DSA journey. Share insights,
            celebrate wins, and help each other level up.
          </p>

          {/* Stats Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {STATS.map(stat => (
              <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: `${stat.color}10`, border: `1px solid ${stat.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: stat.color }}>{stat.icon}</span>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 600, color: '#e2e2e8', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', color: '#7a756e' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tab Switcher ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '36px' }}>
          {(['discussions', 'leaderboard'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 500,
                color: activeTab === tab ? '#f3dfc0' : '#7a756e',
                padding: '9px 24px', borderRadius: '9999px', border: 'none',
                background: activeTab === tab ? 'rgba(243,223,192,0.08)' : 'transparent',
                cursor: 'pointer', transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#d7c4a6'
                  e.currentTarget.style.background = 'rgba(243,223,192,0.04)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#7a756e'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {tab === 'discussions' ? '💬 Discussions' : '🏆 Leaderboard'}
            </button>
          ))}
        </div>

        {/* ── Content Area ── */}
        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

          {/* Main Content */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {activeTab === 'discussions' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* ── New Post Composer ── */}
                <div style={{
                  background: 'rgba(22,24,28,0.6)', border: '1px solid rgba(243,223,192,0.1)',
                  borderRadius: '16px', padding: '24px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(74,222,128,0.08))',
                      border: '1px solid rgba(74,222,128,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 600, color: '#4ade80',
                    }}>Y</div>
                    <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 600, color: '#e2e2e8' }}>Share your thoughts</span>
                  </div>
                  <input
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Title — What's on your mind?"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(243,223,192,0.08)',
                      background: 'rgba(12,14,18,0.5)', color: '#e2e2e8',
                      fontFamily: 'Sora, sans-serif', fontSize: '14px', outline: 'none',
                      marginBottom: '10px', boxSizing: 'border-box',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(243,223,192,0.2)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(243,223,192,0.08)'}
                  />
                  <textarea
                    value={newBody}
                    onChange={e => setNewBody(e.target.value)}
                    placeholder="Share your DSA journey, ask a question, or help someone out..."
                    rows={3}
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(243,223,192,0.08)',
                      background: 'rgba(12,14,18,0.5)', color: '#e2e2e8',
                      fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '14px', outline: 'none',
                      resize: 'vertical', minHeight: '70px', lineHeight: 1.6, boxSizing: 'border-box',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(243,223,192,0.2)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(243,223,192,0.08)'}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button
                      onClick={handleNewPost}
                      disabled={!newTitle.trim() || !newBody.trim()}
                      style={{
                        padding: '9px 22px', borderRadius: '9999px', border: 'none',
                        background: newTitle.trim() && newBody.trim() ? 'linear-gradient(135deg, #f3dfc0, #d7c4a6)' : 'rgba(243,223,192,0.1)',
                        color: newTitle.trim() && newBody.trim() ? '#111317' : '#7a756e',
                        fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600,
                        cursor: newTitle.trim() && newBody.trim() ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                      }}
                    >
                      Post →
                    </button>
                  </div>
                </div>

                {/* ── Post Feed ── */}
                {posts.map(post => {
                  const isLiked = likedPosts.has(post.id)
                  const isSaved = savedPosts.has(post.id)
                  return (
                  <div
                    key={post.id}
                    style={{
                      background: post.pinned ? 'rgba(243,223,192,0.04)' : 'rgba(22,24,28,0.5)',
                      border: `1px solid ${post.pinned ? 'rgba(243,223,192,0.12)' : 'rgba(243,223,192,0.06)'}`,
                      borderRadius: '16px', padding: '24px',
                      transition: 'all 0.3s ease', cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.borderColor = 'rgba(243,223,192,0.25)'
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(243,223,192,0.1)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.borderColor = post.pinned ? 'rgba(243,223,192,0.12)' : 'rgba(243,223,192,0.06)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {/* Author row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(215,196,166,0.2), rgba(243,223,192,0.08))',
                        border: '1px solid rgba(243,223,192,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 600, color: '#f3dfc0',
                      }}>
                        {post.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8' }}>{post.author}</span>
                          <span style={{
                            fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '10px', fontWeight: 600,
                            color: post.roleColor, padding: '2px 8px', borderRadius: '9999px',
                            background: `${post.roleColor}15`, border: `1px solid ${post.roleColor}25`,
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                          }}>
                            {post.role}
                          </span>
                          {post.pinned && (
                            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#f3dfc0' }}>push_pin</span>
                          )}
                        </div>
                        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', color: '#7a756e' }}>{post.time}</span>
                      </div>
                    </div>

                    {/* Title + body */}
                    <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 8px 0' }}>
                      {post.title}
                    </h3>
                    <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '14px', color: '#988f85', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                      {post.body}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                      {post.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 500,
                          color: TAG_COLORS[tag] || '#988f85', padding: '3px 10px', borderRadius: '8px',
                          background: `${TAG_COLORS[tag] || '#988f85'}10`,
                          border: `1px solid ${TAG_COLORS[tag] || '#988f85'}20`,
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer — Interactive Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {/* Like */}
                      <button onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }} style={{
                        display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px',
                        borderRadius: '8px', border: 'none', cursor: 'pointer',
                        background: isLiked ? 'rgba(248,113,113,0.1)' : 'transparent',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { if (!isLiked) e.currentTarget.style.background = 'rgba(248,113,113,0.05)' }}
                      onMouseLeave={e => { if (!isLiked) e.currentTarget.style.background = 'transparent' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: isLiked ? '#f87171' : '#7a756e', fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: isLiked ? '#f87171' : '#7a756e' }}>{post.likes}</span>
                      </button>

                      {/* Reply */}
                      <button onClick={(e) => { e.stopPropagation(); setReplyOpen(replyOpen === post.id ? null : post.id); }} style={{
                        display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px',
                        borderRadius: '8px', border: 'none', cursor: 'pointer',
                        background: replyOpen === post.id ? 'rgba(130,170,255,0.1)' : 'transparent',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { if (replyOpen !== post.id) e.currentTarget.style.background = 'rgba(130,170,255,0.05)' }}
                      onMouseLeave={e => { if (replyOpen !== post.id) e.currentTarget.style.background = 'transparent' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: replyOpen === post.id ? '#82aaff' : '#7a756e' }}>chat_bubble_outline</span>
                        <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', color: replyOpen === post.id ? '#82aaff' : '#7a756e' }}>{post.replies}</span>
                      </button>

                      <div style={{ flex: 1 }} />

                      {/* Save */}
                      <button onClick={(e) => { e.stopPropagation(); toggleSave(post.id); }} style={{
                        display: 'flex', alignItems: 'center', padding: '6px 10px',
                        borderRadius: '8px', border: 'none', cursor: 'pointer',
                        background: isSaved ? 'rgba(243,223,192,0.08)' : 'transparent',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { if (!isSaved) e.currentTarget.style.background = 'rgba(243,223,192,0.04)' }}
                      onMouseLeave={e => { if (!isSaved) e.currentTarget.style.background = 'transparent' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: isSaved ? '#f3dfc0' : '#7a756e', fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>{isSaved ? 'bookmark' : 'bookmark_border'}</span>
                      </button>

                      {/* Share */}
                      <button onClick={(e) => { e.stopPropagation(); handleShare(post.title); }} style={{
                        display: 'flex', alignItems: 'center', padding: '6px 10px',
                        borderRadius: '8px', border: 'none', cursor: 'pointer',
                        background: 'transparent', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#7a756e' }}>share</span>
                      </button>
                    </div>

                    {/* Reply Input */}
                    {replyOpen === post.id && (
                      <div style={{ marginTop: '14px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(74,222,128,0.08))',
                          border: '1px solid rgba(74,222,128,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 600, color: '#4ade80',
                        }}>Y</div>
                        <textarea
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          rows={2}
                          style={{
                            flex: 1, padding: '10px 14px', borderRadius: '10px',
                            border: '1px solid rgba(243,223,192,0.1)', background: 'rgba(12,14,18,0.5)',
                            color: '#e2e2e8', fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px',
                            outline: 'none', resize: 'none', lineHeight: 1.5, boxSizing: 'border-box',
                          }}
                          onFocus={e => e.currentTarget.style.borderColor = 'rgba(130,170,255,0.3)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'rgba(243,223,192,0.1)'}
                        />
                        <button
                          onClick={() => handleReply(post.id)}
                          disabled={!replyText.trim()}
                          style={{
                            padding: '10px 16px', borderRadius: '10px', border: 'none',
                            background: replyText.trim() ? '#82aaff' : 'rgba(130,170,255,0.15)',
                            color: replyText.trim() ? '#111317' : '#7a756e',
                            fontFamily: 'Sora, sans-serif', fontSize: '12px', fontWeight: 600,
                            cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                            alignSelf: 'flex-end',
                          }}
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                  )
                })}
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div style={{
                background: 'rgba(22,24,28,0.5)', border: '1px solid rgba(243,223,192,0.06)',
                borderRadius: '16px', overflow: 'hidden',
              }}>
                {/* Header */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px',
                  padding: '14px 24px', borderBottom: '1px solid rgba(243,223,192,0.06)',
                  fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 600,
                  color: '#7a756e', textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  <span>Rank</span>
                  <span>Developer</span>
                  <span style={{ textAlign: 'center' }}>Problems</span>
                  <span style={{ textAlign: 'center' }}>Streak</span>
                </div>

                {LEADERBOARD.map((user, i) => (
                  <div
                    key={user.rank}
                    style={{
                      display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px',
                      padding: '16px 24px', alignItems: 'center',
                      borderBottom: i < LEADERBOARD.length - 1 ? '1px solid rgba(243,223,192,0.04)' : 'none',
                      background: user.rank <= 3 ? 'rgba(243,223,192,0.02)' : 'transparent',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(243,223,192,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = user.rank <= 3 ? 'rgba(243,223,192,0.02)' : 'transparent'}
                  >
                    <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 600, color: user.rank <= 3 ? '#f3dfc0' : '#7a756e' }}>
                      {user.badge}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(215,196,166,0.15), rgba(243,223,192,0.05))',
                        border: '1px solid rgba(243,223,192,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Sora, sans-serif', fontSize: '12px', fontWeight: 600, color: '#d7c4a6',
                      }}>
                        {user.name.charAt(0)}
                      </div>
                      <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 500, color: '#e2e2e8' }}>{user.name}</span>
                    </div>
                    <span style={{ textAlign: 'center', fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 600, color: '#d7c4a6' }}>{user.problems}</span>
                    <span style={{ textAlign: 'center', fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#4ade80' }}>🔥 {user.streak}d</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right Sidebar ── */}
          <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Join Card */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(243,223,192,0.06), rgba(215,196,166,0.02))',
              border: '1px solid rgba(243,223,192,0.12)', borderRadius: '16px', padding: '24px', textAlign: 'center',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#f3dfc0', marginBottom: '12px', display: 'block' }}>rocket_launch</span>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 8px 0' }}>
                Start Contributing
              </h3>
              <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#988f85', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                Share your DSA journey, ask questions, and help others grow.
              </p>
              <a
                href="https://github.com/NITESH-DANGI/DSA_ALGO"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 24px', borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #f3dfc0, #d7c4a6)',
                  color: '#111317', fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px rgba(243,223,192,0.25)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(243,223,192,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(243,223,192,0.25)'
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                Join on GitHub
              </a>
            </div>

            {/* Trending Tags */}
            <div style={{
              background: 'rgba(22,24,28,0.5)', border: '1px solid rgba(243,223,192,0.06)',
              borderRadius: '16px', padding: '20px', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.borderColor = 'rgba(243,223,192,0.15)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(243,223,192,0.06)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>trending_up</span>
                Trending Tags
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {Object.entries(TAG_COLORS).map(([tag, color]) => (
                  <span key={tag} style={{
                    fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px',
                    color, padding: '4px 10px', borderRadius: '8px',
                    background: `${color}10`, border: `1px solid ${color}20`,
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${color}20`
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${color}10`
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div style={{
              background: 'rgba(22,24,28,0.5)', border: '1px solid rgba(243,223,192,0.06)',
              borderRadius: '16px', padding: '20px', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.borderColor = 'rgba(243,223,192,0.15)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(243,223,192,0.06)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#4ade80' }}>star</span>
                Top Contributors
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {LEADERBOARD.slice(0, 4).map(user => (
                  <div key={user.rank} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(215,196,166,0.15), rgba(243,223,192,0.05))',
                      border: '1px solid rgba(243,223,192,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 600, color: '#d7c4a6',
                    }}>
                      {user.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '12px', fontWeight: 500, color: '#e2e2e8' }}>{user.name}</div>
                      <div style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '10px', color: '#7a756e' }}>{user.problems} problems</div>
                    </div>
                    <span style={{ fontSize: '14px' }}>{user.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div style={{
              background: 'rgba(22,24,28,0.5)', border: '1px solid rgba(243,223,192,0.06)',
              borderRadius: '16px', padding: '20px', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.borderColor = 'rgba(243,223,192,0.15)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(243,223,192,0.06)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            >
              <h4 style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 14px 0' }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: 'route', label: 'DSA Roadmap', href: '/roadmap' },
                  { icon: 'play_circle', label: 'Explore Algorithms', href: '/algorithms' },
                  { icon: 'description', label: 'Documentation', href: '/docs' },
                  { icon: 'info', label: 'About AlgoFlow', href: '/about' },
                ].map(link => (
                  <Link key={link.label} href={link.href} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 12px', borderRadius: '10px',
                    textDecoration: 'none', transition: 'background 0.2s',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(243,223,192,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>{link.icon}</span>
                    <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#cfc5b9' }}>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toast Notification ── */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          padding: '12px 28px', borderRadius: '12px', zIndex: 9999,
          background: 'rgba(22,24,28,0.95)', border: '1px solid rgba(243,223,192,0.15)',
          backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          animation: 'popIn 0.3s ease-out',
        }}>
          <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '14px', color: '#f3dfc0' }}>{toast}</span>
        </div>
      )}

      <style>{`
        @keyframes popIn { 0% { opacity:0; transform:translateX(-50%) scale(0.9) translateY(8px); } 100% { opacity:1; transform:translateX(-50%) scale(1) translateY(0); } }
      `}</style>
    </div>
  )
}
