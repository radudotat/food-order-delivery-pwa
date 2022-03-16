// import React from 'react';

import { User } from '../../lib/database';

// import Link from 'next/link';
// import {useUser} from '@auth0/nextjs-auth0';
type Props = {
  userObject?: User;
};

export default function Header(props: Props) {
  console.log(props.userObject);
  return <header>&nbsp</header>;
}
