import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

//#region Types

type IconMeta = Meta<typeof Icon>;
type IconStoryObj = StoryObj<typeof Icon>;

//#endregion
//#region Stories

// Create the meta
const meta: IconMeta = {
  component: Icon,
  tags: ['autodocs'],
  args: { className: 'h-10', icon: 'address' },
};

// Create the template
const Example: IconStoryObj = {};

//#endregion
//#region Exports

export default meta;
export { Example };

//#endregion
