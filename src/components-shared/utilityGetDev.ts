import Axios from 'axios';

export interface Props {
  username: string;
}

export const utilityGetDev = async (username: Props) => {
  const response = await Axios.get(`/users/${username}`, {
    baseURL: 'https://cosmocode-test.herokuapp.com',
    headers: {
      apiKey:
        'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
    },
  });
  return response.data;
};
