import React, { useState, useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

import { LineItemLegacyInput } from 'src/api';
import { AutocompleteInput } from '../AutocompleteInput';
import { IconButton } from '../IconButton';
import { TextInput } from '../TextInput';
import { FormLineItemInputProps } from './types';
import { Button } from '../Button';
import { Transition } from '@headlessui/react';

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
  const [supplierId, setSupplierId] = useState('');

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
    <div className="flex flex-col gap-2">
      {/******************************/}
      {/* Inputs                     */}
      {/******************************/}
      <label className="font-medium text-app-dark">{label}</label>
      <div className="flex justify-between">
        <div className="w-1/2 mr-4">
          <TextInput
            placeholder="Order #"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </div>
        <div className="w-1/2 mr-2">
          <AutocompleteInput
            placeholder="Supplier"
            options={suppliers}
            value={supplierId}
            onChange={setSupplierId}
          />
        </div>
        <IconButton
          onClick={handleAdd}
          type="button"
          variant="text"
          size="large"
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
        className="flex flex-wrap gap-2 p-4 rounded shadow-inner bg-app-medium/50"
        enter="transition duration-100 ease-out"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <p className="w-full text-sm font-medium">Added Line Items</p>

        {value.map((item: LineItemLegacyInput, index: number) => (
          <Button
            rounded
            size="small"
            key={`${item.orderNumber}-${item.supplierId}-${index}`}
            rightRender={<XMarkIcon />}
            onClick={(e) => handleRemoveItem(e, index)}
            title={`${index + 1}. ${item.orderNumber} - ${
              supplierMap[item.supplierId]
            }`}
          />
        ))}
      </Transition>
    </div>
  );
};
