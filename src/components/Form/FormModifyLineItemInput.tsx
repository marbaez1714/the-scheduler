import React, { useState, useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import cn from 'classnames';

import { ModifyLineItemLegacyInput } from 'src/api';
import { AutocompleteInput } from '../AutocompleteInput';
import { IconButton } from '../IconButton';
import { TextInput } from '../TextInput';
import { FormModifyLineItemInputProps } from './types';
import { Button } from '../Button';
import { Transition } from '@headlessui/react';
import { InputLabel } from '../InputLabel';

export const FormModifyLineItemInput = <TFields extends FieldValues>({
  suppliers,
  label,
  ...rest
}: FormModifyLineItemInputProps<TFields>) => {
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

  const originalLineItems = useMemo(() => {
    return value.filter((item: ModifyLineItemLegacyInput) => item.id);
  }, [value]);

  const newLineItems = useMemo(() => {
    return value.filter((item: ModifyLineItemLegacyInput) => !item.id);
  }, [value]);

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

  const handleMarkForDelete = (e: React.MouseEvent, id?: string) => {
    e.stopPropagation();
    e.preventDefault();

    const newValue: ModifyLineItemLegacyInput[] = [...value];
    const modifyIndex = newValue.findIndex((item) => item.id === id);
    newValue[modifyIndex].delete = !newValue[modifyIndex].delete;
    onChange(newValue);
  };

  const handleRemoveItem = (
    e: React.MouseEvent,
    { orderNumber, supplierId }: ModifyLineItemLegacyInput
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const newValue: ModifyLineItemLegacyInput[] = [...value];
    const removeIndex = newValue.findIndex(
      (item) =>
        item.orderNumber === orderNumber && item.supplierId === supplierId
    );
    newValue.splice(removeIndex, 1);
    onChange(newValue);
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
          size="large"
          disabled={!orderNumber || !supplierId}
          icon="plusCircle"
        />
      </div>
      {/******************************/}
      {/* Original Line Items        */}
      {/******************************/}
      <Transition
        show={!!originalLineItems.length}
        className="mt-4 flex flex-wrap gap-2 rounded bg-app-medium/50 p-4 shadow-inner transition-all"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <p className="w-full text-sm font-medium">Original Line Items</p>

        {originalLineItems.map(
          (item: ModifyLineItemLegacyInput, index: number) => (
            <Button
              className={cn({ '!bg-app-warn line-through': item.delete })}
              key={`${item.orderNumber}-${item.supplierId}-${index}`}
              leftIcon={item.delete ? 'remove' : 'trash'}
              onClick={(e) => handleMarkForDelete(e, item.id)}
            >{`${item.orderNumber} - ${supplierMap[item.supplierId]}`}</Button>
          )
        )}
      </Transition>

      {/******************************/}
      {/* New Line Items             */}
      {/******************************/}
      <Transition
        show={!!newLineItems.length}
        className="mt-4 flex flex-wrap gap-2 rounded bg-app-success/50 p-4 shadow-inner transition-all"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <p className="w-full text-sm font-medium">New Line Items</p>

        {newLineItems.map((item: ModifyLineItemLegacyInput, index: number) => (
          <Button
            key={`${item.orderNumber}-${item.supplierId}-${index}`}
            leftIcon="trash"
            onClick={(e) => handleRemoveItem(e, item)}
          >{`${item.orderNumber} - ${supplierMap[item.supplierId]}`}</Button>
        ))}
      </Transition>
    </div>
  );
};
