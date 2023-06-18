import { gql } from 'urql';

const CONTRACT_ADDR = process.env.REACT_CONTRACT_ADDRESS || '0xc9e7e612afec0ebf928da3a0f297ae53d3598d7d33cfac7b1072a605dd672961';

export const CREATOR_ADDRESS = process.env.REACT_CREATOR_ADDRESS || '0xa9186f2d8c237d16f9cbf4a1fc0f7e87d80e6d3d002c3b7a05a3b4e46a6b9e92';

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
    query CurrentTokens($address: String, $offset: Int, $creator_address: String) {
        current_token_ownerships(
            where: {
                owner_address: { _eq: $address }
                amount: { _gt: "0" }
                table_type: { _eq: "0x3::token::TokenStore" }
                current_token_data: { name: { _in: ["urn", "golden_urn"] } }
                collection_name: { _eq: "urn" }
                creator_address: { _eq: $creator_address }
            }
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
