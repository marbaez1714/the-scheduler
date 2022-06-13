import { Loop } from '@mui/icons-material';
import { Text } from 'src/components/Text';
import { useFirebase } from 'src/hooks/useFirebase';

export const StatusBar = () => {
  const { authState } = useFirebase();

  return (
    <div className="bg-slate-200 flex py-1 px-2 opacity-75">
      <p className="text-xs text-slate-800 px-4">
        Version: {process.env.REACT_APP_VERSION}
      </p>
      <p className="text-xs text-slate-800 px-4">
        {authState.user !== null
          ? 'Status: Authorized'
          : 'Status: Unauthorized'}
      </p>
    </div>
  );
};
