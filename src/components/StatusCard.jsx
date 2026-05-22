import React from 'react';
import './StatusCard.css';

export default function StatusCard({ statusGeral }) {
    const isCritico = statusGeral === 'CRÍTICO';
    
    return (
        <div className={`shark-card ${isCritico ? 'state-critico' : 'state-moderado'}`}>
            <div className="scan-line"></div>
            
            <div className="position-relative" style={{ zIndex: 2 }}>
                <h6 className="shark-card-label">Nível de Risco - Recife/PE</h6>
                <h2 className="shark-card-value">{statusGeral}</h2>
                <p className="shark-card-desc">
                    {isCritico 
                        ? '🚨 PERIGO: Aproximação imediata detectada no Posto 4 (Acaiaca)! Evite o banho de mar agora.' 
                        : 'Ativo: Monitoramento tecnológico em tempo real. Registros de animais nas últimas 48h.'}
                </p>
            </div>
        </div>
    );
}