import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const username = 'raakanaka'
    
    // Fetch user data
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!userRes.ok) {
      throw new Error('Failed to fetch GitHub user')
    }
    
    const userData = await userRes.json()
    
    // Fetch repos to calculate total stars
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    })
    
    let totalStars = 0
    let totalForks = 0
    
    if (reposRes.ok) {
      const repos = await reposRes.json()
      totalStars = repos.reduce((acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count, 0)
      totalForks = repos.reduce((acc: number, repo: { forks_count: number }) => acc + repo.forks_count, 0)
    }
    
    // Calculate years on GitHub
    const createdAt = new Date(userData.created_at)
    const now = new Date()
    const yearsOnGitHub = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365))
    
    return NextResponse.json({
      username: userData.login,
      name: userData.name,
      avatar: userData.avatar_url,
      bio: userData.bio,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      totalForks,
      yearsOnGitHub: Math.max(1, yearsOnGitHub),
      url: userData.html_url
    })
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 })
  }
}
