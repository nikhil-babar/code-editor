export default function getGoogleAuthUrl() {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  const query = new URLSearchParams();

  const options = {
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri: "http://localhost:5000/auth/google",
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    prompt: "consent",
    access_type: "offline",
  };

  for (const [key, value] of Object.entries(options)) {
    query.append(key, value);
  }

  url.search = query.toString();

  return url.href;
}
