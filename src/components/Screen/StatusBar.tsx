import { useAuth0 } from '@auth0/auth0-react';
import { Text } from 'src/components/Text';

export const StatusBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="bg-slate-300 flex py-1 opacity-75">
      <Text type="small" className="px-4 text-slate-800">
        Version: {process.env.REACT_APP_VERSION}
      </Text>
      <Text type="small" className="px-4 text-slate-800">
        {isAuthenticated ? 'Status: Authorized' : 'Status: Unauthorized'}
      </Text>
    </div>
  );
};
