import type { Meta, StoryObj } from '@storybook/react';
import { TextInput as TextInputComponent } from './TextInput';

//#region - Types

type TextInputMeta = Meta<typeof TextInputComponent>;
type TextInputStoryObj = StoryObj<typeof TextInputComponent>;

//#endregion
//#region - Meta

const meta: TextInputMeta = {
  component: TextInputComponent,
  tags: ['autodocs'],
  args: { label: 'Label', name: 'name' },
};

export default meta;

//#endregion
//#region - Stories

export const TextInput: TextInputStoryObj = {};

//#endregion
