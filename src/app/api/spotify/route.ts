import { NextResponse } from 'next/server'

interface SpotifyNowPlaying {
  is_playing: boolean
  item: {
    name: string
    artists: Array<{ name: string }>
    album: {
      name: string
      images: Array<{ url: string }>
    }
    duration_ms: number
  } | null
}

interface SpotifyRecentlyPlayed {
  items: Array<{
    track: {
      name: string
      artists: Array<{ name: string }>
      album: {
        name: string
        images: Array<{ url: string }>
      }
      duration_ms: number
    }
  }>
}

interface SpotifyToken {
  access_token: string
  error?: string
  error_description?: string
}

async function getAccessToken(): Promise<{ token: string | null; error: string | null }> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    return { 
      token: null, 
      error: `Missing: ${!clientId ? 'CLIENT_ID ' : ''}${!clientSecret ? 'CLIENT_SECRET ' : ''}${!refreshToken ? 'REFRESH_TOKEN' : ''}`.trim()
    }
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
    })

    const data = await response.json() as SpotifyToken

    if (!response.ok || data.error) {
      return { 
        token: null, 
        error: `Spotify API: ${data.error || response.status} - ${data.error_description || 'Unknown error'}` 
      }
    }

    return { token: data.access_token, error: null }
  } catch (error) {
    return { token: null, error: `Exception: ${error}` }
  }
}

async function getNowPlaying(accessToken: string): Promise<{ data: SpotifyNowPlaying | null; status: number; error: string | null }> {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      cache: 'no-store'
    })

    if (response.status === 204) {
      return { data: null, status: 204, error: 'No track playing (204)' }
    }
    
    if (!response.ok) {
      const text = await response.text()
      return { data: null, status: response.status, error: text }
    }

    const data = await response.json() as SpotifyNowPlaying
    return { data, status: 200, error: null }
  } catch (error) {
    return { data: null, status: 0, error: String(error) }
  }
}

async function getRecentlyPlayed(accessToken: string): Promise<{ data: SpotifyRecentlyPlayed | null; status: number; error: string | null }> {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      const text = await response.text()
      return { data: null, status: response.status, error: text }
    }
    
    const data = await response.json() as SpotifyRecentlyPlayed
    return { data, status: 200, error: null }
  } catch (error) {
    return { data: null, status: 0, error: String(error) }
  }
}

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  // Debug info - ALWAYS included
  const debug = {
    envSet: {
      clientId: clientId ? `${clientId.substring(0, 4)}...${clientId.substring(clientId.length - 4)}` : null,
      clientSecret: clientSecret ? `${clientSecret.substring(0, 4)}...` : null,
      refreshToken: refreshToken ? `${refreshToken.substring(0, 10)}...` : null,
    },
    timestamp: new Date().toISOString()
  }

  try {
    const { token: accessToken, error: tokenError } = await getAccessToken()

    if (!accessToken) {
      return NextResponse.json({
        isPlaying: false,
        title: null,
        artist: null,
        album: null,
        albumArt: null,
        progress: 0,
        duration: 0,
        debug: {
          ...debug,
          step: 'getAccessToken',
          error: tokenError
        }
      })
    }

    // Try to get currently playing
    const nowPlayingResult = await getNowPlaying(accessToken)

    if (nowPlayingResult.data && nowPlayingResult.data.is_playing && nowPlayingResult.data.item) {
      return NextResponse.json({
        isPlaying: true,
        title: nowPlayingResult.data.item.name,
        artist: nowPlayingResult.data.item.artists.map(a => a.name).join(', '),
        album: nowPlayingResult.data.item.album.name,
        albumArt: nowPlayingResult.data.item.album.images[0]?.url || null,
        progress: 0,
        duration: nowPlayingResult.data.item.duration_ms,
        debug: { ...debug, step: 'nowPlaying', success: true }
      })
    }

    // If not playing, get recently played
    const recentlyPlayedResult = await getRecentlyPlayed(accessToken)
    
    if (recentlyPlayedResult.data && recentlyPlayedResult.data.items && recentlyPlayedResult.data.items.length > 0) {
      const track = recentlyPlayedResult.data.items[0].track
      return NextResponse.json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || null,
        progress: 0,
        duration: track.duration_ms,
        debug: { ...debug, step: 'recentlyPlayed', success: true }
      })
    }

    return NextResponse.json({
      isPlaying: false,
      title: null,
      artist: null,
      album: null,
      albumArt: null,
      progress: 0,
      duration: 0,
      debug: { 
        ...debug, 
        step: 'noData',
        accessTokenOk: !!accessToken,
        nowPlaying: {
          status: nowPlayingResult.status,
          error: nowPlayingResult.error,
          hasData: !!nowPlayingResult.data
        },
        recentlyPlayed: {
          status: recentlyPlayedResult.status,
          error: recentlyPlayedResult.error,
          hasData: !!recentlyPlayedResult.data
        }
      }
    })
  } catch (error) {
    return NextResponse.json({
      isPlaying: false,
      title: null,
      artist: null,
      album: null,
      albumArt: null,
      progress: 0,
      duration: 0,
      debug: { ...debug, step: 'exception', error: String(error) }
    })
  }
}
// trigger redeploy
