import { gql } from 'urql';

const CONTRACT_ADDR = process.env.REACT_CONTRACT_ADDRESS
  || '0x190a7f50fe50d55ffb80c014066a35aec2f3e0419d747df4e947aad00b53b18d';

export const CREATOR_ADDRESS = process.env.REACT_CREATOR_ADDRESS || '0x798e0fb0b1b19e2a55eb6f356528351da0603f358c0363181147ac7a6cd79ae4';

export default CONTRACT_ADDR;

export const queryAltarData = gql`
      query CurrentTokens($address: String, $offset: Int,$creator_address: String) {
        current_token_ownerships(
            where: {owner_address: {_eq: $address}, amount: {_gt: "0"}, table_type: {_eq: "0x3::token::TokenStore"}, current_token_data: {name: {}}, collection_name: {_eq: "urn"},creator_address: {_eq: $creator_address}}
            offset: $offset
        ) {
            token_data_id_hash
            name
            collection_name
            property_version
            amount
            token_properties
            # default_properties
            current_token_data {
              ...TokenDataFields
            }
        }
    }
    fragment TokenDataFields on current_token_datas {
      creator_address
      collection_name
      description
      metadata_uri
      name
      token_data_id_hash
      collection_data_id_hash
      default_properties
  }
`;
