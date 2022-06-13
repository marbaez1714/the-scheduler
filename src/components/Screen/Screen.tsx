import { Text } from '../Text';
import { Header } from '../Header';
import { ScreenProps } from './types';
import { StatusBar } from './StatusBar';

const Screen = ({ title, subtitle, children, headerProps }: ScreenProps) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header {...headerProps} />

      {/* Screen Container */}
      <div className="container mx-auto flex flex-grow flex-col">
        {/* Title and Subtitle Container */}
        {(title || subtitle) && (
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
        )}

        {/* Screen Content */}
        {children}
      </div>
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default Screen;
