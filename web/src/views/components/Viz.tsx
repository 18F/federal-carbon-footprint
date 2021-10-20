import React, { useEffect, useState } from 'react';

import { getDummyData } from '@web/data/dummy';
import { useAppContext } from '@web/views/hooks/app-context';

// Temporary - move this behavior out of the view.
const useDummyData = () => {
  const ctx = useAppContext();
  const [data, setData] = useState([]);
  useEffect(() => {
    getDummyData(ctx).then(result => setData(result));
  }, []);
  return data;
};

export const Viz = () => {
  const data = useDummyData();
  return (
    <>
      {data.map((datum, index) => (
        <div key={index}>{JSON.stringify(datum)}</div>
      ))}
    </>
  );
};
