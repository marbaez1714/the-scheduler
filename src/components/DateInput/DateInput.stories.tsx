import type { Meta, StoryObj } from '@storybook/react';
import { DateInput as DateInputComponent } from './DateInput';

//#region - Types

type DateInputMeta = Meta<typeof DateInputComponent>;
type DateInputStoryObj = StoryObj<typeof DateInputComponent>;

//#endregion
//#region - Meta

const meta: DateInputMeta = {
  component: DateInputComponent,
  tags: ['autodocs'],
  args: { label: 'Label', name: 'name' },
};

export default meta;

//#endregion
//#region - Stories

export const DateInput: DateInputStoryObj = {};

//#endregion
