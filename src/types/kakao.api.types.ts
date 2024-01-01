import {RegionProps} from './geo.types';

export interface GetAddressFromCoordsResponse {
  meta: {
    total_count: number;
  };
  documents: AddressFromCoordsDocument[];
}

export interface AddressFromCoordsDocument {
  road_address: AddressFromCoordsRoadAddress;
  address: AddressFromCoordsAddress;
}

export interface AddressFromCoordsRoadAddress {
  address_name: string; //'경기도 안성시 죽산면 죽산초교길 69-4';
  region_1depth_name: string; // '경기';
  region_2depth_name: string; // '안성시';
  region_3depth_name: string; // '죽산면';
  road_name: string; // '죽산초교길';
  utnderground_yn: string; // 'N';
  main_building_no: string; // '69';
  sub_building_no: string; // '4';
  building_name: string; // '무지개아파트';
  zone_no: string; // '17519';
}

export interface AddressFromCoordsAddress {
  address_name: string; // '경기 안성시 죽산면 죽산리 343-1';
  region_1depth_name: string; // '경기';
  region_2depth_name: string; // '안성시';
  region_3depth_name: string; // '죽산면 죽산리';
  mountain_yn: string; // 'N';
  main_address_no: string; // '343';
  sub_address_no: string; // '1';
}

export interface GetCoordsFromAddressProps extends RegionProps {
  address: string;
}
export interface GetCoordsFromAddressResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: CoordsFromAddressDocument[];
}

export interface CoordsFromAddressDocument {
  address_name: string;
  y: string;
  x: string;
  address_type: string;
  address: CoordsFromAddress;
  road_address: CoordsFromRoadAddress;
}

export interface CoordsFromAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: string;
  y: string;
}

export interface CoordsFromRoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  y: string;
  x: string;
}

export interface GetCoordsFromKeywordResponse {
  meta: {
    same_name: {
      region: any[];
      keyword: string;
      selected_region: string;
    };
    pageable_count: number;
    total_count: number;
    is_end: boolean;
  };
  documents: CoordsFromKeywordDocument[];
}

export interface CoordsFromKeywordDocument {
  place_name: string;
  distance: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  id: string;
  phone: string;
  category_group_code: string;
  category_group_name: string;
  x: string;
  y: string;
}
