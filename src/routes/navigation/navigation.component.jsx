import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../context/user.context'
import { CartContext } from '../../context/cart.context'
import { signOutUser } from '../../utils/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.componentn';

import { 
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo'>Logo</CrwnLogo>
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            Shop
          </NavLink>
          {
            currentUser 
            ? <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            : <NavLink to='/auth'>SIGN IN</NavLink>
          }
          <CartIcon />
        </NavLinks>
        { 
          isCartOpen && <CartDropdown />
        }
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation;