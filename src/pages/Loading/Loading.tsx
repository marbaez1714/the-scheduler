import { Loop } from '@mui/icons-material';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Loop className="animate-spin" fontSize="large" />
    </div>
  );
};

export default Loading;
