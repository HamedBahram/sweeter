export const reloadSession = async () => {
  await fetch('/api/auth/session?update=true').then(res => res.json())
  const event = new Event('visibilitychange')
  document.dispatchEvent(event)
}
