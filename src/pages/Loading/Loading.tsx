import { Loop } from '@mui/icons-material';

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loop className="animate-spin" fontSize="large" />
    </div>
  );
};

export default Loading;
