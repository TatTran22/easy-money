import React, { useEffect, useState, createContext, useContext } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '~/src/utils/supabaseClient'
import { useRouter } from 'next/router'

export const UserContext = createContext<{ user: User | null; session: Session | null }>({
  user: null,
  session: null,
})
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}
export const SignOut = async () => {
  return supabase.auth.signOut()
}
export const RequireAuth = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      void router.push('/auth/login')
    }
  }, [user, router])
}

export const AuthRedirect = () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      void router.push('/')
    }
  }, [user, router])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserContextProvider = (props: any) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const ss = supabase.auth.session()
    setSession(ss)
    setUser(ss?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, sess) => {
      console.log(`Supabase auth event: ${event}`)
      setSession(sess)
      setUser(sess?.user ?? null)
    })
    console.log(`Supabase auth listener: ${authListener}`)
    return () => {
      authListener?.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    session,
    user,
  }
  return <UserContext.Provider value={value} {...props} />
}

const AuthUser = () => {
  const { user } = useUser()
  return user
}

export default AuthUser
