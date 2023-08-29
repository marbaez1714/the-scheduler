import type { Meta, StoryObj } from '@storybook/react';
import { Button as ButtonComponent } from './Button';

//#region - Types

type ButtonMeta = Meta<typeof ButtonComponent>;
type ButtonStoryObj = StoryObj<typeof ButtonComponent>;

//#endregion
//#region - Meta

const meta: ButtonMeta = {
  component: ButtonComponent,
  tags: ['autodocs'],
  args: { children: 'Button' },
};

export default meta;

//#endregion
//#region - Stories

export const Button: ButtonStoryObj = {};

//#endregion
