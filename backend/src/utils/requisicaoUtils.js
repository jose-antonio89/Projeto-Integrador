function obterCampo(obj, nomes = [], valorPadrao = undefined) {
  for (const nome of nomes) {
    if (obj?.[nome] !== undefined) {
      return obj[nome];
    }
  }
  return valorPadrao;
}

function normalizarTipoConta(valor) {
  const texto = String(valor || '').trim().toLowerCase();
  if (texto === 'freelancer') return 'Freelancer';
  if (texto === 'contratante') return 'Contratante';
  return '';
}

module.exports = { obterCampo, normalizarTipoConta };
