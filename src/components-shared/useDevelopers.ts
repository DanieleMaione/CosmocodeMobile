import Axios from 'axios';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addDev} from '../../slice/developerSlice';

import {TDeveloper} from './types';

export const useDevelopers = () => {
  const [developers, setDevelopers] = useState<Array<TDeveloper>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDevelopers = async () => {
      const response = await Axios.get('/users', {
        baseURL: 'https://cosmocode-test.herokuapp.com',
        headers: {
          apiKey:
            'vfpfqjcrk1TJD6tdzbcg_JHT1mnq9rdv4pdzzrf4qmt8QFR-vtc_muhwke8qep-ymt5cuw.ARX',
        },
      });
      setDevelopers(response.data);
    };

    getDevelopers();
  }, []);

  dispatch(addDev(developers));

  return developers;
};
