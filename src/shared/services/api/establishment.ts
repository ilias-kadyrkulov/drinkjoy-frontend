import { drinkjoyApi } from '../interceptors';

export const createEstablishment = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      owner: string;
      name: string;
      email: string;
      latitude: string;
      longitude: string;
      phone_number: string;
      happy_hour_start?: string;
      happy_hour_end?: string;
    };
  },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  if (data) {
    localStorage.setItem('establishment_id', data.id);
  }

  return data;
};
