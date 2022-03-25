import { User as UserIcon } from './icons';

type Props = {
  isLoggedIn: boolean;
};

export default function UserMenu(props: Props) {
  console.log('UserMenu props', props);
  return props.isLoggedIn ? <UserIcon /> : <p>Login</p>;
}
