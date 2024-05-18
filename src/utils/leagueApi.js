// api.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const MAX_RETRIES = 3;

const api = axios.create({
    baseURL: 'https://league-of-legends-galore.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'league-of-legends-galore.p.rapidapi.com',
    },
});

export const getPlayerRank = async (
    summonerName,
    tagLine,
    region,
    retries = 0
) => {
    try {
        const response = await api.get('/api/getPlayerRank', {
            method: 'GET',
            params: {
                name: `${summonerName}-${tagLine}`,
                region: region,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching player rank:', error);

        if (retries < MAX_RETRIES) {
            return getPlayerRank(summonerName, tagLine, region, retries + 1);
        } else {
            const errorInfo = {
                message: "Summoner doesn't exist",
                params: error.response.config.params,
            };
            throw errorInfo;
        }
    }
};

// export const getChampion = async (championName) => {
//   try {
//     const response = await api.get("/api/selectChamp", {
//       params: {
//         name: championName,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching champion:", error);
//     throw error;
//   }
// };

export const getTwitchStreams = async (retries = 0) => {
    try {
        const response = await api.get('/api/getListOfStreams', {
            params: {
                numOfClips: '6',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching streams:', error);

        if (retries < MAX_RETRIES) {
            console.log(`Retrying... (${retries + 1})`);
            return getTwitchStreams(retries + 1);
        } else {
            throw error;
        }
    }
};

export const getAllLeagueRanks = async (retries = 0) => {
    try {
        const response = await api.get('/api/getLoLRanks');
        return response.data;
    } catch (error) {
        console.error('Error fetching ranks:', error);

        if (retries < MAX_RETRIES) {
            console.log(`Retrying... (${retries + 1})`);
            return getTwitchStreams(retries + 1);
        } else {
            throw error;
        }
    }
};
