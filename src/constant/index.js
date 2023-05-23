import { gql } from 'urql';

const CONTRACT_ADDR = '0xc9e7e612afec0ebf928da3a0f297ae53d3598d7d33cfac7b1072a605dd672961';

export default CONTRACT_ADDR;

export const queryAltarData = gql`
      query CurrentTokens($address: String, $offset: Int) {
        current_token_ownerships(
            where: {owner_address: {_eq: $address}, amount: {_gt: "0"}, table_type: {_eq: "0x3::token::TokenStore"}, current_token_data: {name: {}}, collection_name: {_eq: "URN"}}
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
