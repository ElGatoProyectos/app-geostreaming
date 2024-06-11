import Link from 'next/link'
import React from 'react'
import Navigation from '@/app/components/navigation'

const home = () => {
  return (
    <div>
      <Navigation></Navigation>
       home
       <br />
      <Link href={"../users/login"}>Iniciar sesión</Link>
      <br />
      <Link href={"../users/register"}>Registrarse</Link>
    </div>
  )
}

export default home
