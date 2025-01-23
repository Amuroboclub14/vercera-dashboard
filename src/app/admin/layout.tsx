"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import pb from '@/lib/pocketbase'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Double check auth on client side
    if (!pb.authStore.isValid) {
      router.push('/login')
    }
    
    const user = pb.authStore.record

    if (!user || user.admin !== true) {
      router.push('/')
    }
  }, [router])

  return <>{children}</>
}