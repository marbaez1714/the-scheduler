import { useEffect, useMemo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';

export const ModifyCompany = () => {
  // - HOOKS - //
  const { companiesGetAll } = useFirebase();

  // - EFFECTS - //
  useEffect(() => {
    companiesGetAll().then((resp) => console.log(resp.data.documents));
  }, []);

  // - ACTIONS - //

  // - JSX - //
  return <div>this is where you can modify the page</div>;
};
