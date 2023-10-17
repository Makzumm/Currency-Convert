import axios from 'axios';

const TOKEN = "/v1/latest?apikey=fca_live_YOjocnZw5ZXY5MhJPmmbNDqqZCmkZC6esnECfvhF"
const HTTPADRESS = "https://api.freecurrencyapi.com"

export default async function fetchCurrency() {
    try {
        const response = await axios.get(`${HTTPADRESS}${TOKEN}`);
        if (response.status !== 200) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}