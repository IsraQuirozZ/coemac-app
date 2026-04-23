// ─── helpers internos ────────────────────────────────────────────────────────
const fmtDate = (d: any) =>
  d
    ? new Date(d).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const userName = (u: any) => (u ? `${u.nombre} ${u.apellido}` : "—");

// ─── HTML para el PDF ────────────────────────────────────────────────────────
export const buildHTML = (
  refs: any[],
  reunions: any[],
  agradecimientos: any[],
  period: "30d" | "year" = "30d",
  metrics: any = null,
) => {
  const periodLabel = period === "year" ? "último año" : "últimos 30 días";
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
    h1   { color: #1A5C4B; font-size: 22px; margin-bottom: 4px; }
    h2   { color: #1A5C4B; font-size: 16px; margin: 28px 0 8px; border-bottom: 1px solid #C5DED7; padding-bottom: 4px; }
    p.sub { color: #666; font-size: 12px; margin: 0 0 20px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px; }
    th { background: #1A5C4B; color: #fff; text-align: left; padding: 6px 8px; }
    td { padding: 6px 8px; border-bottom: 1px solid #eee; }
    tr:nth-child(even) td { background: #F7F9F8; }
    .badge { display:inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
    .pendiente  { background:#E8E8E8; color:#555; }
    .resuelta   { background:#D4EBE3; color:#1A5C4B; }
    .interna    { background:#D4EBE3; color:#1A5C4B; }
    .externa    { background:#EDF4F1; color:#2A7A64; }
    footer { margin-top: 40px; font-size: 11px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <h1>Informe de Actividad — COEMAC</h1>
  <p class="sub">${periodLabel} - Generado el ${fmtDate(new Date())}</p>

  ${
    metrics
      ? `
    <div style="margin-bottom: 24px;">
      <h2>Importe</h2>
      <p><strong>Importe total generado:</strong> ${metrics.totalImporte?.toFixed(2) || "0"} €</p>
    </div>

    <div style="margin-bottom: 24px;">
      <h2>Usuario que más generó</h2>
      <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Importe generado</th>
          <th>Agradecimientos recibidos</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>
              ${metrics.topImportador.usuario.nombre}
            </td>
            <td>
              ${metrics.topImportador.totalImporte.toFixed(2)} €
            </td>
            <td>
              ${metrics.topImportador.totalAgradecimientos}
            </td>
          </tr>        
      </tbody>
    </table>
    </div>
  `
      : ""
  }

  <h2>Referencias (${refs.length})</h2>
  ${
    refs.length === 0
      ? "<p>Sin referencias.</p>"
      : `
  <table>
    <thead><tr><th>Para</th><th>Contacto referido</th><th>Tipo</th><th>Fecha</th></tr></thead>
    <tbody>
      ${refs
        .map((r) => {
          const isSent = !!r.emisorId;

          return `
            <tr>
              <td>${isSent ? userName(r.receptor) : userName(r.emisor)}</td>
              <td>${r.nombreContacto || "—"}</td>
              <td><span class="badge ${r.tipo?.toLowerCase()}">${r.tipo || "—"}</span></td>
              <td>${fmtDate(r.fechaReferencia || r.createdAt)}</td>
            </tr>`;
        })
        .join("")}
    </tbody>
  </table>`
  }

  ${
    metrics?.topReferenciadores?.length
      ? `
    <h2>Top 3 · Referenciadores</h2>

    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Referencias Enviadas</th>
        </tr>
      </thead>
      <tbody>
        ${metrics.topReferenciadores
          .map(
            (item: any) => `
          <tr>
            <td>
              ${item.usuario.nombre} ${item.usuario.apellido}
            </td>
            <td>
              ${item.totalReferencias}
            </td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `
      : ""
  }

  <div style="page-break-before: always;"></div>

  <h2>Reuniones (${reunions.length})</h2>
${
  reunions.length === 0
    ? "<p>Sin reuniones.</p>"
    : `
    <table>
      <thead>
        <tr>
          <th>Creador</th>
          <th>Invitado</th>
          <th>Estado</th>
          <th>Fecha agendada</th>
        </tr>
      </thead>
      <tbody>
        ${reunions
          .map((r) => {
            return `
            <tr>
              <td>${userName(r.creador)}</td>
              <td>${userName(r.invitado)}</td>
              <td>${r.estado || "—"}</td>
              <td>${fmtDate(r.fechaHora || r.fecha)}</td>
            </tr>`;
          })
          .join("")}
      </tbody>
    </table>`
}

${
  metrics?.topReuniones?.length
    ? `
    <h2>Top 3 · Con más reuniones</h2>

    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Reuniones</th>
        </tr>
      </thead>
      <tbody>
        ${metrics.topReuniones
          .map(
            (item: any) => `
          <tr>
            <td>
              ${item.usuario.nombre} ${item.usuario.apellido}
            </td>
            <td>
              ${item.totalReuniones}
            </td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `
    : ""
}

  <div style="page-break-before: always;"></div>

  <h2>Agradecimientos GNC (${agradecimientos.length})</h2>
  ${
    agradecimientos.length === 0
      ? "<p>Sin agradecimientos.</p>"
      : `
  <table>
    <thead><tr><th>Para</th><th>Contacto negocio</th><th>Importe (€)</th><th>Fecha negocio</th></tr></thead>
    <tbody>
      ${agradecimientos
        .map(
          (a) => `
      <tr>
        <td>${userName(a.receptor)}</td>
        <td>${a.nombreContacto || "—"}</td>
        <td>${a.importe != null ? `${a.importe.toFixed(2)} €` : "—"}</td>
        <td>${fmtDate(a.fechaNegocio || a.createdAt)}</td>
      </tr>`,
        )
        .join("")}
    </tbody>
  </table>`
  }

  ${
    metrics?.topImportadores?.length
      ? `
    <h2>Top 3 · Mayor importe generado</h2>

    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Importe total</th>
          <th>Agradecimientos</th>
        </tr>
      </thead>
      <tbody>
        ${metrics.topImportadores
          .map(
            (item: any) => `
          <tr>
            <td>
              ${item.usuario.nombre} ${item.usuario.apellido}
            </td>
            <td>
              ${item.totalImporte.toFixed(2)} €
            </td>
            <td>
              ${item.totalAgradecimientos}
            </td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `
      : ""
  }

  <div style="page-break-before: always;"></div>

  <h2>Resumen General</h2>

  <div style="margin-top: 20px; line-height: 1.9;">
    <p><strong>Total referencias:</strong> ${refs.length}</p>
    <p><strong>Total reuniones:</strong> ${reunions.length}</p>
    <p><strong>Total agradecimientos:</strong> ${agradecimientos.length}</p>
    <p><strong>Importe generado:</strong> ${metrics?.totalImporte?.toFixed(2) || "0"} €</p>

    ${
      metrics?.topImportador
        ? `
        <p>
          <strong>Mayor generador de negocio:</strong>
          ${metrics.topImportador.usuario.nombre}
          ${metrics.topImportador.usuario.apellido}
          (${metrics.topImportador.totalImporte.toFixed(2)} €)
        </p>
      `
        : ""
    }

    ${
      metrics?.topReferenciadores?.[0]
        ? `
        <p>
          <strong>Top referenciador:</strong>
          ${metrics.topReferenciadores[0].usuario.nombre}
          ${metrics.topReferenciadores[0].usuario.apellido}
          (${metrics.topReferenciadores[0].totalReferencias} referencias)
        </p>
      `
        : ""
    }

    ${
      metrics?.topReuniones?.[0]
        ? `
        <p>
          <strong>Mayor participación en reuniones:</strong>
          ${metrics.topReuniones[0].usuario.nombre}
          ${metrics.topReuniones[0].usuario.apellido}
          (${metrics.topReuniones[0].totalReuniones} reuniones)
        </p>
      `
        : ""
    }
  </div>
  <footer>
    <p style="color: #005947;">COEMAC · Informe generado automáticamente · ${fmtDate(new Date())}</p>
  </footer>
</body>
</html>`;
};
