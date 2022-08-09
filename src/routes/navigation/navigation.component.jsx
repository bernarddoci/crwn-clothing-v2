import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { useDispatch } from 'react-redux';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.componentn';

import { 
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutUser = () => dispatch(signOutStart())

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