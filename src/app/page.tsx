'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Github, 
  Mail, 
  MapPin, 
  Sparkles,
  Terminal,
  Coffee,
  Music,
  Calendar,
  Clock,
  Heart,
  Code2,
  Figma,
  MessageCircle,
  ArrowUpRight,
  FileCode,
  Globe,
  Star,
  GitFork,
  Users,
  FolderGit2,
  Briefcase,
  GraduationCap,
  User,
  Send,
  CheckCircle,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react'

interface GitHubStats {
  username: string
  name: string
  publicRepos: number
  followers: number
  totalStars: number
  yearsOnGitHub: number
  url: string
}

export default function Home() {
  const [time, setTime] = useState<Date | null>(null)
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [typedName, setTypedName] = useState('')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const fullName = 'Rafiq Al Hafizh Adha'

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setTypedName(fullName.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100) // Speed of typing

    return () => clearInterval(typingInterval)
  }, [])

  useEffect(() => {
    const updateTime = () => setTime(new Date())
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => setGithubStats(data))
      .catch(err => console.error('Failed to fetch GitHub stats:', err))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: '', email: '', subject: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const skills = ['Next.js', 'TypeScript', 'PHP', 'WordPress', 'Laravel', 'Figma', 'PostgreSQL', 'Git', 'Tailwind']

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance',
      period: '2023 - Present',
      type: 'freelance',
      desc: 'Membangun aplikasi web untuk berbagai klien menggunakan Next.js, Laravel, dan WordPress.'
    },
    {
      title: 'Web Developer',
      company: 'Tech Startup',
      period: '2022 - 2023',
      type: 'fulltime',
      desc: 'Mengembangkan fitur baru dan maintenance aplikasi web berbasis React dan Node.js.'
    },
    {
      title: 'Frontend Developer Intern',
      company: 'Digital Agency',
      period: '2021 - 2022',
      type: 'intern',
      desc: 'Belajar dan berkontribusi dalam proyek client menggunakan React dan Vue.js.'
    },
  ]

  const aboutPoints = [
    { icon: Code2, text: 'Passionate Web Developer dengan pengalaman 3+ tahun' },
    { icon: GraduationCap, text: 'Terus belajar teknologi baru dan mengikuti tren industri' },
    { icon: Coffee, text: 'Pecinta kopi yang percaya kode terbaik ditulis dengan kafein' },
    { icon: Heart, text: 'Fokus pada clean code dan user experience yang baik' },
  ]

  const blogPosts = [
    { 
      title: 'Building Modern Web Apps with Next.js 14', 
      desc: 'Exploring the latest features in Next.js 14 including server actions.',
      date: 'Jan 2025', 
      read: '5 min',
      tag: 'Next.js'
    },
    { 
      title: 'WordPress vs Headless CMS', 
      desc: 'Perbandingan antara WordPress tradisional dan headless CMS.',
      date: 'Dec 2024', 
      read: '4 min',
      tag: 'WordPress'
    },
    { 
      title: 'Laravel Query Optimization', 
      desc: 'Tips mengoptimalkan query database di Laravel.',
      date: 'Nov 2024', 
      read: '6 min',
      tag: 'Laravel'
    },
  ]

  const projects = [
    { 
      name: 'E-Commerce Platform', 
      year: '2024',
      desc: 'Full-stack marketplace with real-time inventory',
      tags: ['Next.js', 'Stripe'],
      status: 'live'
    },
    { 
      name: 'Task Manager', 
      year: '2024',
      desc: 'Collaborative kanban with drag & drop',
      tags: ['React', 'Socket.io'],
      status: 'live'
    },
    { 
      name: 'AI Chat App', 
      year: '2024',
      desc: 'Intelligent assistant with context memory',
      tags: ['OpenAI', 'TypeScript'],
      status: 'beta'
    },
  ]

  const socials = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/raakanaka', color: 'hover:bg-white/10' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:bg-blue-500/20' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:bg-sky-500/20' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:bg-pink-500/20' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
          
          {/* Hero Card */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-8 rounded-3xl bg-gradient-to-br from-[#1a1a1c] to-[#0f0f10] border border-white/5 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-white/40 font-mono tracking-wider">AVAILABLE FOR WORK</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              <span className="text-white/90">Hi, I&apos;m</span>
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent inline-flex items-center">
                {typedName}
                <span className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 animate-blink" />
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-white/40 font-light max-w-md mb-6">
              Web developer crafting digital experiences with code and creativity
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/60 hover:bg-white/10">
                <MapPin className="w-3 h-3 mr-1" />
                Indonesia
              </Badge>
              <Badge variant="outline" className="bg-white/5 border-white/10 text-white/60 hover:bg-white/10">
                <Code2 className="w-3 h-3 mr-1" />
                Web Developer
              </Badge>
            </div>
          </div>

          {/* Right Side Cards Container */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
            
            {/* Avatar Card */}
            <div className="col-span-1 row-span-1 sm:row-span-2 rounded-3xl bg-[#1a1a1c] border border-white/5 p-2 sm:p-3 relative overflow-hidden aspect-square sm:aspect-auto">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-pink-500/20 to-cyan-500/20">
                <img 
                  src="/avatar.png" 
                  alt="Avatar" 
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                />
              </div>
            </div>

            {/* Time Card */}
            <div className="col-span-1 rounded-2xl bg-[#1a1a1c] border border-white/5 p-3 sm:p-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/30" />
                <span className="text-xs text-white/40 font-mono">LOCAL</span>
              </div>
              <span className="text-lg sm:text-xl font-mono text-white/80 tabular-nums">
                {time ? time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </span>
            </div>

            {/* Status Card */}
            <div className="col-span-2 sm:col-span-1 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/20 p-3 sm:p-4 flex items-center gap-3">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 flex-shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-white/40">Currently</span>
                <span className="text-xs sm:text-sm text-white/80 truncate">Building something cool</span>
              </div>
            </div>
          </div>

          {/* About Me Detail */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-12 rounded-3xl bg-gradient-to-br from-[#1a1a1c] to-[#0f0f10] border border-white/5 p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-full blur-3xl" />
            
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-white/40 font-mono tracking-wider">ABOUT ME</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-4">
                  Saya adalah seorang <span className="text-white/80">Full Stack Web Developer</span> yang berbasis di Indonesia. 
                  Dengan passion dalam membangun aplikasi web yang modern, responsif, dan user-friendly. 
                  Saya mengkhususkan diri dalam pengembangan aplikasi menggunakan teknologi seperti{' '}
                  <span className="text-cyan-400">Next.js</span>, <span className="text-pink-400">Laravel</span>, dan{' '}
                  <span className="text-violet-400">WordPress</span>.
                </p>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  Saya percaya bahwa kode yang baik adalah kode yang mudah dibaca dan dipelihara. 
                  Saya selalu berusaha untuk menulis clean code dan mengikuti best practices dalam setiap proyek yang saya kerjakan.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {aboutPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <point.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-white/60">{point.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 rounded-3xl bg-[#1a1a1c] border border-white/5 p-5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-white/40 font-mono tracking-wider">TECH STACK</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary"
                  className="bg-white/5 text-white/70 border-0 hover:bg-white/10 transition-all duration-200 text-xs sm:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Latest Posts */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-8 rounded-3xl bg-[#1a1a1c] border border-white/5 p-5 sm:p-6 relative overflow-hidden group cursor-pointer hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-white/40 font-mono tracking-wider">LATEST POSTS</span>
              </div>
              <span className="text-xs text-white/20 hidden sm:block">View all →</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {blogPosts.map((post, idx) => (
                <div key={idx} className="group/post cursor-pointer p-3 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/5 transition-colors border border-white/5">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-white/50 text-xs">
                      {post.tag}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-white/30">
                      <Calendar className="w-3 h-3" />
                      <span className="hidden sm:inline">{post.date}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-white/80 group-hover/post:text-white transition-colors leading-snug mb-1 sm:mb-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-white/40 leading-relaxed line-clamp-2 hidden sm:block">
                    {post.desc}
                  </p>
                  <div className="flex items-center gap-1 mt-2 sm:mt-3 text-xs text-white/30">
                    <Clock className="w-3 h-3" />
                    <span>{post.read} read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section Header */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-12 flex items-center gap-3 mt-4">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/60 font-medium tracking-wide">EXPERIENCE</span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {/* Experience Cards */}
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className="col-span-1 sm:col-span-2 lg:col-span-4 rounded-3xl bg-[#1a1a1c] border border-white/5 p-5 sm:p-6 relative overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  exp.type === 'fulltime' ? 'bg-emerald-500/20 text-emerald-400' :
                  exp.type === 'freelance' ? 'bg-violet-500/20 text-violet-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {exp.type === 'fulltime' ? 'Full-time' : exp.type === 'freelance' ? 'Freelance' : 'Intern'}
                </span>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold text-white/90 mb-1">
                {exp.title}
              </h3>
              <p className="text-sm text-cyan-400 mb-2">{exp.company}</p>
              <p className="text-xs text-white/30 mb-3">{exp.period}</p>
              <p className="text-sm text-white/50 leading-relaxed">{exp.desc}</p>
            </div>
          ))}

          {/* GitHub Stats */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#1a1a1c] to-[#0f0f10] border border-white/5 p-5 sm:p-6 relative overflow-hidden group cursor-pointer hover:border-white/20 transition-all duration-300"
            onClick={() => githubStats && window.open(githubStats.url, '_blank')}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Github className="w-4 h-4 text-white/60" />
              <span className="text-xs text-white/40 font-mono tracking-wider">GITHUB STATS</span>
            </div>
            
            {githubStats ? (
              <>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-semibold text-white">@{githubStats.username}</span>
                  <Badge variant="outline" className="bg-white/5 border-white/10 text-white/40 text-xs">
                    {githubStats.yearsOnGitHub} yrs
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-white/5 rounded-xl p-2 sm:p-3 text-center">
                    <FolderGit2 className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 mx-auto mb-1" />
                    <p className="text-lg sm:text-xl font-bold text-white">{githubStats.publicRepos}</p>
                    <p className="text-xs text-white/40">Repos</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 sm:p-3 text-center">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-lg sm:text-xl font-bold text-white">{githubStats.totalStars}</p>
                    <p className="text-xs text-white/40">Stars</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 sm:p-3 text-center">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400 mx-auto mb-1" />
                    <p className="text-lg sm:text-xl font-bold text-white">{githubStats.followers}</p>
                    <p className="text-xs text-white/40">Followers</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2 sm:p-3 text-center">
                    <GitFork className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 mx-auto mb-1" />
                    <p className="text-lg sm:text-xl font-bold text-white">{githubStats.totalStars > 0 ? Math.floor(githubStats.totalStars / 3) : 0}</p>
                    <p className="text-xs text-white/40">Contribs</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-32">
                <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
              </div>
            )}
            
            <ArrowUpRight className="absolute bottom-4 right-4 w-4 h-4 text-white/20 group-hover:text-white/60 transition-all" />
          </div>

          {/* Spotify Playlist Widget */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-8 rounded-3xl bg-[#1a1a1c] border border-white/5 p-5 sm:p-6 relative overflow-hidden group hover:border-green-500/20 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-4 h-4 text-green-400" />
              <span className="text-xs text-white/40 font-mono tracking-wider">MY PLAYLIST</span>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <iframe 
                src="https://open.spotify.com/embed/playlist/37i9dQZF1E381yRElai9NJ?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </div>

          {/* Projects Section Header */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-12 flex items-center gap-3 mt-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-white/60 font-medium tracking-wide">FEATURED WORK</span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {/* Project Cards */}
          {projects.map((project, idx) => (
            <div 
              key={project.name}
              className="col-span-1 sm:col-span-1 lg:col-span-4 rounded-3xl bg-[#1a1a1c] border border-white/5 p-4 sm:p-5 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
            >
              <span className="absolute top-4 right-4 text-3xl sm:text-4xl font-bold text-white/5 group-hover:text-white/10 transition-colors">
                0{idx + 1}
              </span>
              
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className={`w-2 h-2 rounded-full ${project.status === 'live' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className="text-xs text-white/30 font-mono uppercase">{project.status}</span>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-white/90 mb-1 group-hover:text-white transition-colors">
                {project.name}
              </h3>
              <p className="text-xs text-white/30 mb-2 sm:mb-4">{project.year}</p>
              <p className="text-sm text-white/50 mb-8 sm:mb-12 line-clamp-2">{project.desc}</p>
              
              <div className="flex flex-wrap gap-1 absolute bottom-4 left-4 right-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-white/50 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <ArrowUpRight className="absolute bottom-4 right-4 w-4 h-4 text-white/20 group-hover:text-white/60 transition-all" />
            </div>
          ))}

          {/* Workspace Image */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-8 rounded-3xl bg-[#1a1a1c] border border-white/5 p-2 relative overflow-hidden group min-h-[200px] sm:min-h-[300px]">
            <img 
              src="/workspace.png" 
              alt="Workspace" 
              className="w-full h-full object-cover rounded-2xl opacity-80 group-hover:opacity-100 transition-all duration-500"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Figma className="w-3 h-3 text-white/60" />
              <span className="text-xs text-white/80">Designed in Figma</span>
            </div>
          </div>

          {/* Quote Card */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/10 p-5 sm:p-6 flex flex-col justify-between min-h-[180px] sm:min-h-[300px]">
            <MessageCircle className="w-5 h-5 text-amber-400/60" />
            <p className="text-sm sm:text-base text-white/60 italic leading-relaxed">
              &ldquo;Clean code is not written by following rules. You become a craftsman by learning heuristics.&rdquo;
            </p>
            <span className="text-xs text-white/30">— Robert C. Martin</span>
          </div>

          {/* Contact Section Header */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-12 flex items-center gap-3 mt-4">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-white/60 font-medium tracking-wide">GET IN TOUCH</span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {/* Contact Form */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-8 rounded-3xl bg-gradient-to-br from-[#1a1a1c] to-[#0f0f10] border border-white/5 p-5 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/5 to-transparent rounded-full blur-3xl" />
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                <CheckCircle className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Pesan Terkirim!</h3>
                <p className="text-sm text-white/50 text-center">Terima kasih telah menghubungi saya. Saya akan membalas pesan Anda secepatnya.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/40 mb-1 block">Nama</label>
                    <Input
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Nama lengkap"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-pink-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-1 block">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-pink-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">Subjek</label>
                  <Input
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    placeholder="Topik pesan"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-pink-500/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1 block">Pesan</label>
                  <Textarea
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tulis pesan Anda di sini..."
                    required
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-pink-500/50 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-semibold py-6 rounded-2xl transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-white/10"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Mengirim...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Social & Info Cards */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 grid grid-cols-1 gap-3 sm:gap-4">
            {/* Email Card */}
            <div className="rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/5 border border-pink-500/10 p-5 relative overflow-hidden group cursor-pointer hover:border-pink-500/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Mail className="w-5 h-5 text-pink-400 mb-3" />
              <h3 className="text-base font-semibold text-white/90 mb-1">Email Me</h3>
              <p className="text-sm text-white/40">hello@rafiq.biz.id</p>
            </div>

            {/* Social Card */}
            <div className="rounded-3xl bg-[#1a1a1c] border border-white/5 p-5 relative overflow-hidden">
              <Globe className="w-4 h-4 text-white/30 mb-3" />
              <h3 className="text-base font-semibold text-white/90 mb-3">Connect</h3>
              <div className="grid grid-cols-2 gap-2">
                {socials.map((social) => (
                  <div 
                    key={social.name}
                    className={`flex items-center gap-2 p-2 rounded-xl ${social.color} transition-colors cursor-pointer`}
                  >
                    <social.icon className="w-4 h-4 text-white/60" />
                    <span className="text-xs text-white/70">{social.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Card */}
            <div className="rounded-3xl bg-[#1a1a1c] border border-white/5 p-5 relative overflow-hidden">
              <MapPin className="w-4 h-4 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white/90 mb-1">Based in</h3>
              <p className="text-sm text-white/40">Indonesia</p>
            </div>
          </div>

          {/* Footer */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-12 flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 py-4 border-t border-white/5">
            <p className="text-xs text-white/30 text-center sm:text-left">
              © {new Date().getFullYear()} Rafiq Al Hafizh Adha — Built with love & caffeine
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/20">Made using Next.js</span>
              <span className="text-xs text-white/20">•</span>
              <span className="text-xs text-white/20">v2.0</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
