import Settings from '@/components/dashboard/settings';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Settings
      username={session?.user.username as string}
      is_teacher={session?.user.role === 'TEACHER' ? true : false}
      email={session?.user?.email as string}
    />
  );
};

export default SettingsPage;
