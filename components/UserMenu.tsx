import { User as UserIcon } from './icons';

type Props = {
  isLoggedIn: boolean;
};

export default function UserMenu(props: Props) {
  return props.isLoggedIn ? <UserIcon /> : <p>Login</p>;
}
