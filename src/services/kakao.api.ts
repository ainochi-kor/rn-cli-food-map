import Config from 'react-native-config';
import {
  GetAddressFromCoordsResponse,
  GetCoordsFromAddressProps,
  GetCoordsFromAddressResponse,
  GetCoordsFromKeywordResponse,
} from '../types/kakao.api.types';

const KAKAO_API_KEY = Config.REACT_APP_KAKAO_API_KEY;

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  console.log('KAKAO_API_KEY', KAKAO_API_KEY);
  return fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
    .then(res => res.json())
    .then((res: GetAddressFromCoordsResponse) => {
      console.log(res);
      if (geoResponseNullCheck(res.meta.total_count, res.documents.length)) {
        return null;
      }

      const addressItem = res.documents[0];

      return addressItem.address.address_name;
    });
};

export const getCoordsFromAddress = (
  address: string,
): Promise<GetCoordsFromAddressProps | null> => {
  return fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
    .then(res => res.json())
    .then((res: GetCoordsFromAddressResponse) => {
      if (geoResponseNullCheck(res.meta.total_count, res.documents.length)) {
        return null;
      }

      const addressItem = res.documents[0];

      return {
        latitude: Number(addressItem.y),
        longitude: Number(addressItem.x),
        address: addressItem.address_name,
      };
    });
};

export const getCoordsFromKeyword = (
  keyword: string,
): Promise<GetCoordsFromAddressProps | null> => {
  return fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
    .then(res => res.json())
    .then((res: GetCoordsFromKeywordResponse) => {
      if (geoResponseNullCheck(res.meta.total_count, res.documents.length)) {
        return null;
      }

      const addressItem = res.documents[0];

      return {
        latitude: Number(addressItem.y),
        longitude: Number(addressItem.x),
        address: addressItem.address_name,
      };
    });
};

const geoResponseNullCheck = (count: number, docLength: number) => {
  return count === 0 || docLength === 0 ? true : false;
};
