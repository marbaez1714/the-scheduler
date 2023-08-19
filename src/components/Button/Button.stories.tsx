import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

//#region Types

type ButtonMeta = Meta<typeof Button>;
type ButtonStoryObj = StoryObj<typeof Button>;

//#endregion
//#region Stories

// Create the meta
const meta: ButtonMeta = {
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
};

// Create the template
const Example: ButtonStoryObj = {};

//#endregion
//#region Exports

export default meta;
export { Example };

//#endregion
