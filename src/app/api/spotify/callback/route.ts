import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ 
      error: 'SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in .env',
      hint: 'Get them from https://developer.spotify.com/dashboard'
    }, { status: 500 })
  }

  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  // Determine redirect URI based on environment
  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = request.headers.get('x-forwarded-proto') || 'https'
  const redirectUri = `${protocol}://${host}/api/spotify/callback`

  // Step 1: Redirect to Spotify auth if no code
  if (!code) {
    const scope = 'user-read-currently-playing user-read-playback-state user-read-recently-played'
    
    const authUrl = new URL('https://accounts.spotify.com/authorize')
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('scope', scope)
    
    return NextResponse.redirect(authUrl.toString())
  }

  // Step 2: Exchange code for tokens
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      })
    })

    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ 
        error: data.error, 
        error_description: data.error_description,
        hint: 'Make sure this redirect URI is added in Spotify Dashboard: ' + redirectUri
      }, { status: 400 })
    }

    // Return the tokens - user should copy the refresh_token
    return new NextResponse(`
<!DOCTYPE html>
<html>
<head>
  <title>Spotify Connected!</title>
  <style>
    body { font-family: system-ui; background: #0a0a0b; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto; }
    h1 { color: #1DB954; }
    .token-box { background: #1a1a1c; padding: 16px; border-radius: 8px; margin: 16px 0; word-break: break-all; font-family: monospace; }
    .env-box { background: #1a1a1c; padding: 16px; border-radius: 8px; border: 1px solid #1DB954; }
    .copy { cursor: pointer; background: #1DB954; color: #000; border: none; padding: 8px 16px; border-radius: 4px; margin-top: 8px; }
    .copy:hover { background: #1ed760; }
    .step { margin: 24px 0; padding: 16px; background: #1a1a1c; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>✅ Spotify Connected!</h1>
  
  <div class="step">
    <h3>Step 1: Copy this Refresh Token</h3>
    <div class="token-box" id="token">${data.refresh_token}</div>
    <button class="copy" onclick="navigator.clipboard.writeText('${data.refresh_token}')">Copy Token</button>
  </div>
  
  <div class="step">
    <h3>Step 2: Add to Environment Variables</h3>
    <p><strong>For Local (.env):</strong></p>
    <div class="env-box">
      SPOTIFY_REFRESH_TOKEN=${data.refresh_token}
    </div>
    
    <p style="margin-top: 20px;"><strong>For Vercel:</strong></p>
    <p>Go to your Vercel project → Settings → Environment Variables → Add:</p>
    <ul>
      <li><code>SPOTIFY_CLIENT_ID</code> = your_client_id</li>
      <li><code>SPOTIFY_CLIENT_SECRET</code> = your_client_secret</li>
      <li><code>SPOTIFY_REFRESH_TOKEN</code> = ${data.refresh_token.substring(0, 20)}...</li>
    </ul>
  </div>
  
  <div class="step">
    <h3>Step 3: Redeploy</h3>
    <p>After adding environment variables in Vercel, redeploy your app.</p>
  </div>
</body>
</html>
`, {
      headers: { 'Content-Type': 'text/html' }
    })

  } catch (error) {
    return NextResponse.json({ error: 'Failed to exchange code for tokens' }, { status: 500 })
  }
}
