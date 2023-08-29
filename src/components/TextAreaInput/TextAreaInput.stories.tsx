import type { Meta, StoryObj } from '@storybook/react';
import { TextAreaInput as TextAreaInputComponent } from './TextAreaInput';

//#region - Types

type TextAreaInputMeta = Meta<typeof TextAreaInputComponent>;
type TextAreaInputStoryObj = StoryObj<typeof TextAreaInputComponent>;

//#endregion
//#region - Meta

const meta: TextAreaInputMeta = {
  component: TextAreaInputComponent,
  tags: ['autodocs'],
  args: { label: 'Label', name: 'name' },
};

export default meta;

//#endregion
//#region - Stories

export const TextAreaInput: TextAreaInputStoryObj = {};

//#endregion
