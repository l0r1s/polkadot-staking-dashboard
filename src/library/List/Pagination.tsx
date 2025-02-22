// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { PaginationWrapper } from '.';
import { PaginationProps } from './types';

export const Pagination = ({ page, total, setter }: PaginationProps) => {
  const [next, setNext] = useState<number>(page + 1 > total ? total : page + 1);
  const [prev, setPrev] = useState<number>(page - 1 < 1 ? 1 : page - 1);

  useEffect(() => {
    setNext(page + 1 > total ? total : page + 1);
    setPrev(page - 1 < 1 ? 1 : page - 1);
  }, [page, total]);

  return (
    <PaginationWrapper prev={page !== 1} next={page !== total}>
      <div>
        <h4>
          Page {page} of {total}
        </h4>
      </div>
      <div>
        <button
          type="button"
          className="prev"
          onClick={() => {
            setter(prev);
          }}
        >
          Prev
        </button>
        <button
          type="button"
          className="next"
          onClick={() => {
            setter(next);
          }}
        >
          Next
        </button>
      </div>
    </PaginationWrapper>
  );
};
