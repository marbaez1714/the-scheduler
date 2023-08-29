import React, { useState, useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

import { CreateLineItemLegacyInput } from 'src/api';
import { AutocompleteInput } from '../AutocompleteInput';
import { IconButton } from '../IconButton';
import { TextInput } from '../TextInput';
import { FormLineItemInputProps } from './types';
import { Button } from '../Button';
import { Transition } from '@headlessui/react';
import { InputLabel } from '../InputLabel';

export const FormLineItemInput = <TFields extends FieldValues>({
  suppliers,
  label,
  ...rest
}: FormLineItemInputProps<TFields>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const {
    field: { value, onChange },
  } = useController(rest);

  /******************************/
  /* State                      */
  /******************************/
  const [orderNumber, setOrderNumber] = useState('');
  const [supplierId, setSupplierId] = useState<string | null>(null);

  /******************************/
  /* Memos                      */
  /******************************/
  const supplierMap = useMemo(() => {
    const newMap: Record<string, string> = {};
    suppliers.forEach((sup) => (newMap[sup.value] = sup.label));
    return newMap;
  }, [suppliers]);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleAdd = () => {
    if (orderNumber && supplierId) {
      onChange([...value, { orderNumber, supplierId }]);
      setOrderNumber('');
      setSupplierId('');
    }
  };

  const handleRemoveItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    const newVal = value;
    newVal.splice(index, 1);
    onChange(newVal);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className="flex flex-col">
      {/******************************/}
      {/* Inputs                     */}
      {/******************************/}
      <InputLabel>{label}</InputLabel>
      <div className="flex items-center justify-between gap-4">
        <TextInput
          placeholder="Order #"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          icon="orderNumber"
        />
        <AutocompleteInput
          placeholder="Supplier"
          options={suppliers}
          value={supplierId}
          onChange={setSupplierId}
          icon="supplier"
        />
        <IconButton
          onClick={handleAdd}
          type="button"
          variant="text"
          disabled={!orderNumber || !supplierId}
        >
          <PlusCircleIcon />
        </IconButton>
      </div>
      {/******************************/}
      {/* Line Items                 */}
      {/******************************/}
      <Transition
        show={!!value.length}
        className="mt-4 flex flex-wrap gap-2 rounded bg-app-medium/50 p-4 shadow-inner transition-all"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <p className="w-full text-sm font-medium">Added Line Items</p>

        {value.map((item: CreateLineItemLegacyInput, index: number) => (
          <Button
            key={`${item.orderNumber}-${item.supplierId}-${index}`}
            rightIcon="trash"
            onClick={(e) => handleRemoveItem(e, index)}
          >
            {item.orderNumber} - {supplierMap[item.supplierId]}
          </Button>
        ))}
      </Transition>
    </div>
  );
};
