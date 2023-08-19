import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { iconMap } from './utils';

//#region Types

type ButtonMeta = Meta<typeof Icon>;
type ButtonStoryObj = StoryObj<typeof Icon>;

//#endregion

// Create the meta
const meta: ButtonMeta = {
  component: Icon,
  tags: ['autodocs'],
  args: { className: 'h-10', icon: 'address' },
};

// Create the template
export const Example: ButtonStoryObj = {};

export default meta;
