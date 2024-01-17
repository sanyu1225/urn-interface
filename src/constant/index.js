import { gql } from 'urql';

const CONTRACT_ADDR =
  process.env.REACT_CONTRACT_ADDRESS || '0xae9ca01742cb35d34223d7b82f634f8e9cb873169cb83fec76c862f1b2aea367';

export const CREATOR_ADDRESS =
  process.env.REACT_CREATOR_ADDRESS || '0xddcdd5511f7ba61b14e5a795ee40b5b876ba7afd3ffa705a253b87656986f42f';

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
