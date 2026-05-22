import React, { useState } from "react";
import StatusCard from "./components/StatusCard";
import SensorList from "./components/SensorList";
import { sharkWaveService } from "./services/api";

export default function App() {
  const [statusGeral, setStatusGeral] = useState("MODERADO");
  const [boiaAlerta, setBoiaAlerta] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState("mapa");

  const dispararAlertaReal = async () => {
    setCarregando(true);
    try {
      const payload = {
        codigo_tag: "TAG-TIGRE-9981",
        codigo_boia: "SW-BOAVIAGEM-01",
        dbm_sinal: -35,
      };

      await sharkWaveService.enviarTelemetria(payload);

      setStatusGeral("CRÍTICO");
      setBoiaAlerta(true);
      setShowModal(true);
      setAbaAtiva("mapa");
    } catch (erro) {
      console.error("Erro ao conectar com a API de telemetria:", erro);
      alert(
        "Falha na conexão com o servidor SharkWave. O seu backend Express está rodando na porta 3000?",
      );
    } finally {
      setCarregando(false);
    }
  };

  const resetarSistema = () => {
    setStatusGeral("MODERADO");
    setBoiaAlerta(false);
    setShowModal(false);
  };

  return (
    <div
      className="smartphone-frame position-relative bg-dark"
      style={{
        width: "360px",
        height: "740px",
        border: "12px solid #334155",
        borderRadius: "36px",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <div className="h-100 d-flex flex-column justify-content-between">
        <div
          className="d-flex justify-content-between px-4 pt-2 text-secondary small"
          style={{ fontSize: "11px" }}
        >
          <span>22:00</span>
          <span>
            5G <i className="bi bi-battery-full"></i>
          </span>
        </div>

        <header className="d-flex justify-content-between align-items-center bg-black px-3 py-3 border-bottom border-secondary">
          <span className="fw-bold text-white">
            🦈 Shark<span className="text-info">Wave</span>
          </span>
          <span className="badge bg-secondary text-info">
            {abaAtiva === "mapa" && "📍 Orla"}
            {abaAtiva === "dados" && "📊 Analytics"}
            {abaAtiva === "ajuda" && "🚨 Suporte"}
          </span>
        </header>

        <main className="p-3 flex-grow-1" style={{ overflowY: "auto" }}>
          {abaAtiva === "mapa" && (
            <>
              <StatusCard statusGeral={statusGeral} />
              <SensorList boiaAlerta={boiaAlerta} />

              <div className="bg-black p-3 rounded border border-secondary text-center">
                <h6 className="text-info mb-2 small">
                  <i className="bi bi-shuffle"></i> Painel de Controle
                  Operacional
                </h6>
                {statusGeral === "MODERADO" ? (
                  <button
                    onClick={dispararAlertaReal}
                    disabled={carregando}
                    className="btn btn-outline-danger btn-sm w-100 fw-bold"
                  >
                    {carregando
                      ? "Processando envio..."
                      : "Enviar Alerta de Telemetria"}
                  </button>
                ) : (
                  <button
                    onClick={resetarSistema}
                    className="btn btn-outline-info btn-sm w-100 fw-bold"
                  >
                    Normalizar Orla / Resetar Painel
                  </button>
                )}
              </div>
            </>
          )}

          {abaAtiva === "dados" && (
            <div className="text-white animate__animated animate__fadeIn">
              <h6 className="text-secondary text-uppercase small mb-3 tracking-wide">
                Métricas de Avistamento (Mensal)
              </h6>

              <div className="bg-black p-3 rounded border border-secondary mb-3">
                <small className="text-secondary d-block mb-2">
                  Detecções por Quadrante (Maio/2026)
                </small>

                <div className="space-y-2">
                  <div className="mb-2">
                    <div
                      className="d-flex justify-content-between small text-white-50 mb-1"
                      style={{ fontSize: "12px" }}
                    >
                      <span>Boa Viagem (Posto 4)</span>
                      <span className="fw-bold text-danger">12</span>
                    </div>
                    <div
                      className="progress bg-secondary"
                      style={{ height: "8px" }}
                    >
                      <div
                        className="progress-bar bg-danger"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div
                      className="d-flex justify-content-between small text-white-50 mb-1"
                      style={{ fontSize: "12px" }}
                    >
                      <span>Piedade (Igrejinha)</span>
                      <span className="fw-bold text-warning">4</span>
                    </div>
                    <div
                      className="progress bg-secondary"
                      style={{ height: "8px" }}
                    >
                      <div
                        className="progress-bar bg-warning"
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div
                      className="d-flex justify-content-between small text-white-50 mb-1"
                      style={{ fontSize: "12px" }}
                    >
                      <span>Pina (Posto 1)</span>
                      <span className="fw-bold text-success">0</span>
                    </div>
                    <div
                      className="progress bg-secondary"
                      style={{ height: "8px" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="card bg-dark border-secondary p-3 text-start"
                style={{ borderRadius: "14px" }}
              >
                <h7
                  className="text-info fw-bold d-block mb-1"
                  style={{ fontSize: "13px" }}
                >
                  <i className="bi bi-cpu-fill"></i> Status de Hardware IoT
                </h7>
                <p className="text-secondary m-0" style={{ fontSize: "12px" }}>
                  Baterias das boias em 100% via captação solar. Latência média
                  de rede estável em 140ms via protocolo MQTT.
                </p>
              </div>
            </div>
          )}

          {abaAtiva === "ajuda" && (
            <div className="text-white">
              <h6 className="text-secondary text-uppercase small mb-3 tracking-wide">
                Protocolo de Emergência
              </h6>

              <div className="d-flex flex-column gap-2">
                <div className="p-3 rounded border border-secondary bg-black text-start">
                  <h6 className="text-warning small fw-bold mb-1">
                    <i className="bi bi-telephone-fill"></i> Corpo de Bombeiros
                    (GBMAR)
                  </h6>
                  <p
                    className="text-secondary m-0"
                    style={{ fontSize: "12px" }}
                  >
                    Em caso de incidentes diretos ou avistamento visual na água,
                    disque imediatamente para o 193.
                  </p>
                </div>

                <div className="p-3 rounded border border-secondary bg-black text-start">
                  <h6 className="text-info small fw-bold mb-1">
                    <i className="bi bi-shield-fill-check"></i> Regras de Ouro
                    de Segurança
                  </h6>
                  <ul
                    className="text-secondary p-0 ps-3 m-0"
                    style={{ fontSize: "12px" }}
                  >
                    <li>
                      Não entre no mar em dias chuvosos ou com água turva.
                    </li>
                    <li>
                      Evite o banho em mar aberto no amanhecer ou entardecer.
                    </li>
                    <li>
                      Respeite rigorosamente as bandeiras vermelhas fincadas na
                      areia.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>

        <nav className="d-flex justify-content-around bg-black py-2 border-top border-secondary">
          <button
            onClick={() => setAbaAtiva("mapa")}
            className={`btn btn-link nav-link small d-flex flex-column align-items-center border-0 ${abaAtiva === "mapa" ? "text-info fw-bold" : "text-secondary"}`}
          >
            <i className="bi bi-geo-alt-fill mb-1"></i> Mapa
          </button>

          <button
            onClick={() => setAbaAtiva("dados")}
            className={`btn btn-link nav-link small d-flex flex-column align-items-center border-0 ${abaAtiva === "dados" ? "text-info fw-bold" : "text-secondary"}`}
          >
            <i className="bi bi-graph-up mb-1"></i> Dados
          </button>

          <button
            onClick={() => setAbaAtiva("ajuda")}
            className={`btn btn-link nav-link small d-flex flex-column align-items-center border-0 ${abaAtiva === "ajuda" ? "text-info fw-bold" : "text-secondary"}`}
          >
            <i className="bi bi-exclamation-triangle mb-1"></i> Ajuda
          </button>
        </nav>
      </div>

      {showModal && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", zIndex: 1050 }}
        >
          <div
            className="card bg-dark border-danger border-2 text-white text-center p-3 shadow-lg"
            style={{ borderRadius: "20px", maxWidth: "300px" }}
          >
            <div className="card-body">
              <div className="text-danger fs-1 mb-2">
                <i className="bi bi-exclamation-triangle-fill"></i>
              </div>
              <h5 className="card-title text-danger fw-bold text-uppercase tracking-wide">
                Alerta de Perigo
              </h5>
              <p className="card-text small text-secondary-emphasis my-3" >
               <strong className="text-white"> Um tubarão de grande porte foi detectado pelos sensores próximo
                ao Posto 4 - Boa Viagem</strong>.
              </p>
              <div
                className="bg-black p-2 rounded small border border-secondary text-start mb-3"
                style={{ fontSize: "11px" }}
              >
                <span className="text-warning d-block">
                  <strong>Ação requerida:</strong>
                </span>
                <span className="text-white-50">
                  Saia imediatamente da água e avise os banhistas ao redor.
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-danger btn-sm w-100 fw-bold rounded-pill shadow"
              >
                Entendido / Ciente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
