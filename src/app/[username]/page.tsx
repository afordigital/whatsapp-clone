"use client"

export default function UserPage({ params }: { params: { username: string } }) {
  return (
    <p>Esto es la página del usuario: {params.username}</p>
  )
}