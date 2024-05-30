import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

import { AdminPartnersResponse } from '../types';

export const useGetAdminPartners = (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const {
    data: partnerData,
    isLoading,
    mutate,
  } = useSWR<AdminPartnersResponse>(
    `/users/register/partner/?offset=${offset}&limit=${limit}`,
    fetcher,
    { keepPreviousData: true },
  );

  useSWR(
    `/users/register/partner/?offset=${offset + limit}&limit=${limit}`,
    fetcher,
  );

  const data = {
    ...partnerData,
    pages: partnerData && Math.ceil(partnerData.count / limit),
  };

  return {
    data,
    isLoading,
    mutate,
  };
};
