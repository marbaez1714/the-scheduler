import type { Meta, StoryObj } from '@storybook/react';
import { Icon as IconComponent } from './Icon';

//#region - Types

type IconMeta = Meta<typeof IconComponent>;
type IconStoryObj = StoryObj<typeof IconComponent>;

//#endregion
//#region - Meta

const meta: IconMeta = {
  component: IconComponent,
  tags: ['autodocs'],
  args: { className: 'h-10', icon: 'address' },
};

export default meta;

//#endregion
//#region - Stories

export const Icon: IconStoryObj = {};

//#endregion
