// utils/pdfTemplateEntity.ts

const fmtDate = (d: any) =>
  d
    ? new Date(d).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const userName = (u: any) => (u ? `${u.nombre} ${u.apellido}` : "—");

export const buildEntityHTML = ({
  type,
  items,
  metrics,
  period,
}: {
  type: string;
  items: any[];
  metrics: any;
  period: any;
}) => {
  const titleMap: Record<string, string> = {
    referencias: "Informe de Referencias",
    reuniones: "Informe de Reuniones",
    agradecimientos: "Informe de Agradecimientos",
  };

  const title = titleMap[type] || "Informe";
  const periodLabel = period === "year" ? "Último año" : "Últimos 30 días";

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 32px;
        color: #111;
      }

      h1 {
        color: #1A5C4B;
        margin-bottom: 4px;
      }

      h2 {
        color: #1A5C4B;
        margin-top: 28px;
        border-bottom: 1px solid #ddd;
        padding-bottom: 6px;
      }

      p {
        font-size: 13px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 16px;
        font-size: 12px;
      }

      th {
        background: #1A5C4B;
        color: white;
        text-align: left;
        padding: 8px;
      }

      td {
        padding: 8px;
        border-bottom: 1px solid #eee;
      }

      tr:nth-child(even) td {
        background: #f8f8f8;
      }

      .summary {
        margin-top: 24px;
        background: #F7F9F8;
        border: 1px solid #DCE7E3;
        padding: 16px;
        border-radius: 8px;
      }

      footer {
        margin-top: 40px;
        font-size: 11px;
        text-align: center;
        color: #888;
      }
    </style>
  </head>

  <body>

    <h1>${title}</h1>
    <p>Periodo: ${periodLabel}</p>
    <p>Generado: ${fmtDate(new Date())}</p>

    <div class="summary">
      <p><strong>Total registros:</strong> ${items.length}</p>

      ${
        type === "agradecimientos"
          ? `<p><strong>Importe total:</strong> ${metrics?.totalImporte?.toFixed(2) || "0"} €</p>`
          : ""
      }
    </div>

    <h2>Listado</h2>

    ${
      items.length === 0
        ? "<p>No hay registros.</p>"
        : `
      <table>
        <thead>
          <tr>
            ${
              type === "referencias"
                ? `
                <th>Emisor</th>
                <th>Receptor</th>
                <th>Contacto</th>
                <th>Tipo</th>
                <th>Fecha</th>
              `
                : ""
            }

            ${
              type === "reuniones"
                ? `
                <th>Creador</th>
                <th>Invitado</th>
                <th>Estado</th>
                <th>Fecha</th>
              `
                : ""
            }

            ${
              type === "agradecimientos"
                ? `
                <th>Emisor</th>
                <th>Receptor</th>
                <th>Importe</th>
                <th>Fecha</th>
              `
                : ""
            }
          </tr>
        </thead>

        <tbody>
          ${items
            .map((item) => {
              if (type === "referencias") {
                return `
                  <tr>
                    <td>${userName(item.emisor)}</td>
                    <td>${userName(item.receptor)}</td>
                    <td>${item.nombreContacto || "—"}</td>
                    <td>${item.tipo || "—"}</td>
                    <td>${fmtDate(item.fechaReferencia || item.createdAt)}</td>
                  </tr>
                `;
              }

              if (type === "reuniones") {
                return `
                  <tr>
                    <td>${userName(item.creador)}</td>
                    <td>${userName(item.invitado)}</td>
                    <td>${item.estado || "—"}</td>
                    <td>${fmtDate(item.fechaHora)}</td>
                  </tr>
                `;
              }

              if (type === "agradecimientos") {
                return `
                  <tr>
                    <td>${userName(item.emisor)}</td>
                    <td>${userName(item.receptor)}</td>
                    <td>${item.importe?.toFixed(2) || "0"} €</td>
                    <td>${fmtDate(item.fechaNegocio || item.createdAt)}</td>
                  </tr>
                `;
              }

              return "";
            })
            .join("")}
        </tbody>
      </table>
    `
    }

    <footer>
        <p style="color: #005947;">COEMAC · Informe generado automáticamente · ${fmtDate(new Date())}</p>
    </footer>

  </body>
  </html>
  `;
};
