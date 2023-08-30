import type { Meta, StoryObj } from '@storybook/react';
import { AutocompleteInput as AutocompleteInputComponent } from './AutocompleteInput';

//#region - Types

type AutocompleteInputMeta = Meta<typeof AutocompleteInputComponent>;
type AutocompleteInputStoryObj = StoryObj<typeof AutocompleteInputComponent>;

//#endregion
//#region - Meta

const meta: AutocompleteInputMeta = {
  component: AutocompleteInputComponent,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    name: 'name',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  },
};

export default meta;

//#endregion
//#region - Stories

export const AutocompleteInput: AutocompleteInputStoryObj = {};

//#endregion
