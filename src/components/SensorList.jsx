import React from 'react';

export default function SensorList({ boiaAlerta }) {
    return (
        <div className="mb-4">
            <h6 className="text-secondary text-uppercase small mb-2 tracking-wide">Sensores Litorâneos</h6>
            <div className="list-group gap-2">
                <div className="list-group-item bg-dark border-secondary text-white d-flex justify-content-between align-items-center rounded">
                    <div>
                        <h6 className="m-0 fw-bold">SW-BOAVIAGEM-01</h6>
                        <small className="text-secondary">Posto 4 - Próximo ao Acaiaca</small>
                    </div>
                    <span className={`badge rounded-pill ${boiaAlerta ? 'bg-danger' : 'bg-success'}`}>
                        {boiaAlerta ? 'ALERTA' : 'ONLINE'}
                    </span>
                </div>

                <div className="list-group-item bg-dark border-secondary text-white d-flex justify-content-between align-items-center rounded">
                    <div>
                        <h6 className="m-0 fw-bold">SW-PIEDADE-02</h6>
                        <small className="text-secondary">Igrejinha de Piedade</small>
                    </div>
                    <span className="badge bg-success rounded-pill">ONLINE</span>
                </div>
            </div>
        </div>
    );
}