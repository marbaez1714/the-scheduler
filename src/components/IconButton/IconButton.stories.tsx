import type { Meta, StoryObj } from '@storybook/react';
import { IconButton as IconButtonComponent } from './IconButton';

//#region - Types

type IconButtonMeta = Meta<typeof IconButtonComponent>;
type IconButtonStoryObj = StoryObj<typeof IconButtonComponent>;

//#endregion
//#region - Meta

const meta: IconButtonMeta = {
  component: IconButtonComponent,
  tags: ['autodocs'],
  args: { icon: 'area' },
};

export default meta;

//#endregion
//#region - Stories

export const IconButton: IconButtonStoryObj = {};

//#endregion
