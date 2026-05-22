import React from 'react';

export default function StatusCard({ statusGeral }) {
    const isCritico = statusGeral === 'CRÍTICO';
    
    return (
        <div className={`card p-3 text-center mb-3 text-white border-0 ${isCritico ? 'bg-danger shadow-lg' : 'bg-warning text-dark'}`}>
            <h6 className="text-uppercase m-0 fw-bold">Status da Orla</h6>
            <h2 className="fw-black my-2">{statusGeral}</h2>
            <p className="small m-0">
                {isCritico 
                    ? '🚨 PERIGO: Aproximação imediata detectada no Posto 4!' 
                    : 'Atenção: Registros de animais nas últimas 48h.'}
            </p>
        </div>
    );
}