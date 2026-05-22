import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
});

export const sharkWaveService = {
    enviarTelemetria: async (dadosTelemetria) => {
        const resposta = await api.post('/telemetria', dadosTelemetria);
        return resposta.data;
    }
};

export default api;