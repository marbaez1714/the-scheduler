import { Loop } from '@mui/icons-material';
import { Text } from 'src/components/Text';
import { useFirebase } from 'src/hooks/useFirebase';

export const StatusBar = () => {
  const { authUser } = useFirebase();

  return (
    <div className="bg-slate-300 flex py-1 px-2 opacity-75">
      <Text type="small" className="px-4 text-slate-800">
        Version: {process.env.REACT_APP_VERSION}
      </Text>
      <Text type="small" className="px-4 text-slate-800">
        {authUser !== null ? 'Status: Authorized' : 'Status: Unauthorized'}
      </Text>
      <Loop fontSize="small" className="text-slate-800 animate-spin" />
    </div>
  );
};
