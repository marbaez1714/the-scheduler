import { useState, useEffect, useMemo } from 'react';

import { TextInput } from '../TextInput';
import { TableHeaderProps } from './types';

export const TableHeader = ({
  onSearchChange,
  searchTerm,
}: TableHeaderProps) => {
  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="flex px-6 py-4 border-b bg-app border-b-app-medium">
      <TextInput
        className='w-1/3 py-1'
        onChange={onSearchChange}
        value={searchTerm}
        placeholder="Search Term"
      />
    </div>
  );
};
