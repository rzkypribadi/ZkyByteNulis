// api.js
import { JSONBIN_API_KEY, JSONBIN_BIN_ID } from './config.js';

export async function saveUserData(userData) {
    try {
        // Pertama dapatkan data yang ada
        const currentData = await getLeaderboardData();
        
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY,
                'X-Bin-Versioning': 'false'
            },
            body: JSON.stringify({
                ...currentData,
                users: {
                    ...(currentData?.users || {}),
                    [userData.name]: userData
                }
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to save user data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error saving user data:', error);
        throw error;
    }
}

export async function saveScoreData(scoreData) {
    try {
        // Pertama dapatkan data yang ada
        const currentData = await getLeaderboardData();
        
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_API_KEY,
                'X-Bin-Versioning': 'false'
            },
            body: JSON.stringify({
                ...currentData,
                leaderboards: {
                    ...(currentData?.leaderboards || {}),
                    [scoreData.timeMode]: {
                        ...(currentData?.leaderboards?.[scoreData.timeMode] || {}),
                        [scoreData.name]: scoreData
                    }
                }
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to save score data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error saving score data:', error);
        throw error;
    }
}

export async function getLeaderboardData() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch leaderboard data');
        }
        
        const data = await response.json();
        return data.record || {};
    } catch (error) {
        console.error('Error getting leaderboard data:', error);
        return {};
    }
}
