type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
  csrfToken: string;
};

export default function Profile(props: Props) {
  console.log('Profile page', props);
  return null;
}
