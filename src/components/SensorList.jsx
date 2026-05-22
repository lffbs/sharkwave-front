import React from 'react';
import './SensorList.css';

export default function SensorList({ boiaAlerta }) {
    return (
        <div className="mb-4">
            <h6 className="sensor-title mb-3">Módulos de Telemetria</h6>
            
            <div className="d-flex flex-column gap-2">
                
                <div className={`sensor-card d-flex justify-content-between align-items-center ${boiaAlerta ? 'sensor-card-alerta' : ''}`}>
                    <div>
                        <h6 className="m-0 fw-bold text-white">
                            {boiaAlerta ? '🚨 SW-BOAVIAGEM-01' : '🛰️ SW-BOAVIAGEM-01'}
                        </h6>
                        <small className="text-secondary">Posto 4 - Próximo ao Acaiaca</small>
                    </div>
                    
                    <span className={`badge indicator-glow ${boiaAlerta ? 'glow-alerta' : 'glow-online'}`}>
                        {boiaAlerta ? 'CRÍTICO' : 'ONLINE'}
                    </span>
                </div>

                <div className="sensor-card d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="m-0 fw-bold text-white">🛰️ SW-PIEDADE-02</h6>
                        <small className="text-secondary">Igrejinha de Piedade</small>
                    </div>
                    <span className="badge indicator-glow glow-online">
                        ONLINE
                    </span>
                </div>

            </div>
        </div>
    );
}