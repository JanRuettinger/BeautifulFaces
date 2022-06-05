import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type MatchRequestType = {
    peerID: string;
    walletAddress: string;
    category: number;
};

// export async function getTokenIDsFromContract(
//     contractAddress: string
// ): Promise<TokenMetaData[]> {
//     const params = new URLSearchParams();
//     params.append('quote-currency', 'USD');
//     params.append('format', 'JSON');
//     params.append('key', apiKey);
//     const response = await axios.get(
//         `https://api.covalenthq.com/v1/${chainID}/tokens/${contractAddress}/nft_token_ids/`,
//         { params }
//     );
//     return response.data.data.items;
// }

export async function sendMatchRequest(matchRequest: MatchRequestType) {
    console.log('In sending api');
    console.log(BACKEND_URL);
    try {
        const reponse = await axios.post(
            BACKEND_URL + 'find_match',
            matchRequest,
            {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        );
        console.log('response: ', reponse);
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
