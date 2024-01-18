import { gql } from 'urql';

const CONTRACT_ADDR =
  process.env.REACT_CONTRACT_ADDRESS || '0x545b9e76fce8ec96afabf1f1615dd229db9b3e93de3b3693e3934c9585565693';

export const CREATOR_ADDRESS =
  process.env.REACT_CREATOR_ADDRESS || '0x7430c2c2cb0012d5098b9e2f462b205160edb89a0f22a0281b7a6b620a84d245';

export default CONTRACT_ADDR;

export const queryAltarData = gql`
  query CurrentTokens($address: String, $creator_address: String) {
    current_token_ownerships(
      where: {
        owner_address: { _eq: $address }
        amount: { _gt: "0" }
        table_type: { _eq: "0x3::token::TokenStore" }
        current_token_data: { name: {} }
        collection_name: { _eq: "urn" }
        creator_address: { _eq: $creator_address }
      }
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

export const queryShovelData = gql`
  query CurrentTokens($address: String, $creator_address: String) {
    current_token_ownerships(
      where: {
        owner_address: { _eq: $address }
        amount: { _gt: "0" }
        table_type: { _eq: "0x3::token::TokenStore" }
        current_token_data: { name: { _eq: "shovel" } }
        collection_name: { _eq: "urn" }
        creator_address: { _eq: $creator_address }
      }
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

export const getItemQuery = (item) => gql`
    query CurrentTokens($address: String, $creator_address: String) {
        current_token_ownerships(
            where: {
                owner_address: { _eq: $address }
                amount: { _gt: "0" }
                table_type: { _eq: "0x3::token::TokenStore" }
                current_token_data: { name: { _eq: "${item}" } }
                collection_name: { _eq: "urn" }
                creator_address: { _eq: $creator_address }
            }
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

export const queryAllUrnData = gql`
  query CurrentTokens($address: String, $creator_address: String) {
    current_token_ownerships(
      where: {
        owner_address: { _eq: $address }
        amount: { _gt: "0" }
        table_type: { _eq: "0x3::token::TokenStore" }
        current_token_data: { name: { _in: ["urn", "golden_urn"] } }
        collection_name: { _eq: "urn" }
        creator_address: { _eq: $creator_address }
      }
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

export const normaBoneList = ['arm', 'leg', 'hip', 'chest', 'skull'];
