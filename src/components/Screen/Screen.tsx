import { Text } from '../Text';
import { Header } from '../Header';
import { ScreenProps } from './types';
import classNames from 'classnames';
import { StatusBar } from './StatusBar';

const Screen = ({
  title,
  subtitle,
  children,
  className,
  headerProps,
  ...rest
}: ScreenProps) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header {...headerProps} />
      {/* Screen Container */}
      <div className="container mx-auto flex flex-grow flex-col" {...rest}>
        {/* Title and Subtitle Container */}
        <div className="pt-10 pb-4 mb-6">
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
      <StatusBar />
    </div>
  );
};

export default Screen;
