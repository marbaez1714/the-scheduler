import { Text } from '../Text';
import { Header } from '../Header';
import { ScreenProps } from './types';
import classNames from 'classnames';
import { useAuth0 } from '@auth0/auth0-react';

const Screen = ({
  title,
  subtitle,
  children,
  className,
  headerProps,
  ...rest
}: ScreenProps) => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header {...headerProps} />
      {/* Screen Container */}
      <div className="container mx-auto flex flex-grow flex-col" {...rest}>
        {/* Title and Subtitle Container */}
        <div className="pt-10 pb-4">
          {/* Title */}
          {title && (
            <Text type="title" centered>
              {title}
            </Text>
          )}
          {/* Subtitle */}
          {subtitle && (
            <Text type="subtitle" centered>
              {subtitle}
            </Text>
          )}
        </div>
        {/* Screen Content */}
        <div className={classNames('flex', className)}>{children}</div>
      </div>
      {/* Status Bar */}
      <div className="bg-slate-300 flex py-1 opacity-75">
        <Text type="small" className="px-4 text-slate-800">
          Version: {process.env.REACT_APP_VERSION}
        </Text>
        <Text type="small" className="px-4 text-slate-800">
          {isAuthenticated ? 'Status: Authorized' : 'Status: Unauthorized'}
        </Text>
      </div>
    </div>
  );
};

export default Screen;
