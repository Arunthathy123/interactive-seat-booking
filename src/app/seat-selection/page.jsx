
import React, { Suspense } from 'react';
import SeatSelection from '@/componets/SeatSelection';

const SeatSelectionPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SeatSelection />
  </Suspense>
);

export default SeatSelectionPage;
