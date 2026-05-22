import React, { useState } from 'react';
import StatusCard from './components/StatusCard';
import SensorList from './components/SensorList';
import { sharkWaveService } from './services/api';

export default function App() {
    const [statusGeral, setStatusGeral] = useState('MODERADO');
    const [boiaAlerta, setBoiaAlerta] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const dispararAlertaReal = async () => {
        setCarregando(true);
        try {
            const payload = {
                codigo_tag: "TAG-TIGRE-9981",
                codigo_boia: "SW-BOAVIAGEM-01",
                dbm_sinal: -35
            };
            
            // Requisição real usando a instância isolada do Axios
            await sharkWaveService.enviarTelemetria(payload);
            
            // Atualiza o estado reativo do React se o Express responder sucesso
            setStatusGeral('CRÍTICO');
            setBoiaAlerta(true);
        } catch (erro) {
            console.error("Erro ao conectar com a API de telemetria:", erro);
            alert("Falha na conexão com o servidor SharkWave. O seu backend Express está rodando na porta 3000?");
        } finally {
            setCarregando(false);
        }
    };

    const resetarSistema = () => {
        setStatusGeral('MODERADO');
        setBoiaAlerta(false);
    };

    return (
        <div className="smartphone-frame position-relative bg-dark" style={{ width: '360px', height: '740px', border: '12px solid #334155', borderRadius: '36px', overflow: 'hidden', margin: '0 auto' }}>
            <div className="h-100 d-flex flex-column justify-content-between">
                
                {/* Barra de Status do Celular */}
                <div className="d-flex justify-content-between px-4 pt-2 text-secondary small" style={{ fontSize: '11px' }}>
                    <span>16:22</span>
                    <span>5G <i className="bi bi-battery-full"></i></span>
                </div>

                {/* Header do App */}
                <header className="d-flex justify-content-between align-items-center bg-black px-3 py-3 border-bottom border-secondary">
                    <span className="fw-bold text-white">🦈 Shark<span className="text-info">Wave</span></span>
                    <span className="badge bg-secondary text-info">Recife</span>
                </header>

                {/* Conteúdo Principal */}
                <main className="p-3 flex-grow-1" style={{ overflowY: 'auto' }}>
                    <StatusCard statusGeral={statusGeral} />
                    <SensorList boiaAlerta={boiaAlerta} />

                    {/* Painel do Desenvolvedor - Controle de Integração */}
                    <div className="bg-black p-3 rounded border border-secondary text-center">
                        <h6 className="text-info mb-2 small"><i className="bi bi-shuffle"></i> Integração Axios para Express</h6>
                        {statusGeral === 'MODERADO' ? (
                            <button 
                                onClick={dispararAlertaReal} 
                                disabled={carregando}
                                className="btn btn-outline-danger btn-sm w-100 fw-bold"
                            >
                                {carregando ? 'Processando...' : 'Disparar Requisição POST Real'}
                            </button>
                        ) : (
                            <button onClick={resetarSistema} className="btn btn-outline-info btn-sm w-100 fw-bold">
                                Resetar Painel
                            </button>
                        )}
                    </div>
                </main>

                {/* Navegação Inferior */}
                <nav className="d-flex justify-content-around bg-black py-2 border-top border-secondary">
                    <a href="#" className="text-info text-decoration-none small d-flex flex-column align-items-center">
                        <i className="bi bi-geo-alt-fill"></i> Mapa
                    </a>
                    <a href="#" className="text-secondary text-decoration-none small d-flex flex-column align-items-center">
                        <i className="bi bi-graph-up"></i> Dados
                    </a>
                    <a href="#" className="text-secondary text-decoration-none small d-flex flex-column align-items-center">
                        <i className="bi bi-exclamation-triangle"></i> Ajuda
                    </a>
                </nav>
            </div>
        </div>
    );
}