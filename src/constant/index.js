import { gql } from 'urql';

const CONTRACT_ADDR = '0x4b7088485460199fd540f4de4d71da425dd8025e988e69577731ae03e67b42c3';

export default CONTRACT_ADDR;

export const queryAltarData = gql`
  query getAccountCurrentTokens($address: String!, $offset: Int) {
    current_token_ownerships(
      where: {owner_address: {_eq: $address}, amount: {_gt: "0"}, table_type: {_eq: "0x3::token::TokenStore"}, current_token_data: {name: {}}, collection_name: {_eq: "URN"}}
      # where: {owner_address: {_eq: $address}, amount: {_gt: 0}}
      order_by: [{last_transaction_version: desc}, {creator_address: desc}, {collection_name: desc}, {name: desc}]
      offset: $offset
    ) {
      amount
      current_token_data {
        ...TokenDataFields
      }
      current_collection_data {
        ...CollectionDataFields
      }
      last_transaction_version
      property_version
      token_properties
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

  fragment CollectionDataFields on current_collection_datas {
    metadata_uri
    supply
    description
    collection_name
    collection_data_id_hash
    table_handle
    creator_address
  }
`;

export const query = gql`
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
