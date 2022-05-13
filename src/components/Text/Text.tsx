import classNames from 'classnames';
import { TextProps } from './types';

const Text = ({ centered, className, type = 'normal', ...rest }: TextProps) => {
  return (
    <p
      className={classNames([
        'font-roboto',
        { 'text-base': type === 'normal' },
        { 'text-4xl font-medium': type === 'title' },
        { 'text-xl font-medium': type === 'subtitle' },
        { 'text-sm font-light': type === 'small' },
        { 'text-center': centered },
        className,
      ])}
      {...rest}
    />
  );
};

export default Text;
