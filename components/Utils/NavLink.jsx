import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({ href, className, activeClass, inactiveClass, children, ...rest }) => {
  const router = useRouter()
  const isMatch = router.pathname === href

  const classes = isMatch ? `${className} ${activeClass}` : `${className} ${inactiveClass}`

  return (
    <Link href={href} {...rest}>
      <a className={classes}>{children}</a>
    </Link>
  )
}

export default NavLink
