import { useEffect, useMemo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';

export const ModifyCompany = () => {
  // - HOOKS - //
  const { companiesGetAll } = useFirebase();

  // - STATE - //

  // - EFFECTS - //
  useEffect(() => {
    console.log('here');
    companiesGetAll().then((resp) => console.log(resp));
  }, []);

  // - ACTIONS - //
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  // - HELPERS - //

  return <form className="flex flex-col divide-y space-y-6"></form>;
};
