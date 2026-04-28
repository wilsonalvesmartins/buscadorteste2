import { useMemo, useState } from "react";
import {
  AlertCircle,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  FileText,
  IdCard,
  Loader2,
  RefreshCw,
  Search,
  Scale
} from "lucide-react";

const DATAJUD_API_KEY = "APIKey cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==";

const TRIBUNAIS = [
  { group: "Tribunais Superiores", label: "TST - Tribunal Superior do Trabalho", value: "tst" },
  { group: "Tribunais Superiores", label: "TSE - Tribunal Superior Eleitoral", value: "tse" },
  { group: "Tribunais Superiores", label: "STJ - Superior Tribunal de Justica", value: "stj" },
  { group: "Tribunais Superiores", label: "STM - Superior Tribunal Militar", value: "stm" },

  { group: "Justica Federal", label: "TRF1 - Tribunal Regional Federal da 1a Regiao", value: "trf1" },
  { group: "Justica Federal", label: "TRF2 - Tribunal Regional Federal da 2a Regiao", value: "trf2" },
  { group: "Justica Federal", label: "TRF3 - Tribunal Regional Federal da 3a Regiao", value: "trf3" },
  { group: "Justica Federal", label: "TRF4 - Tribunal Regional Federal da 4a Regiao", value: "trf4" },
  { group: "Justica Federal", label: "TRF5 - Tribunal Regional Federal da 5a Regiao", value: "trf5" },
  { group: "Justica Federal", label: "TRF6 - Tribunal Regional Federal da 6a Regiao", value: "trf6" },

  { group: "Justica Estadual", label: "TJAC - Tribunal de Justica do Acre", value: "tjac" },
  { group: "Justica Estadual", label: "TJAL - Tribunal de Justica de Alagoas", value: "tjal" },
  { group: "Justica Estadual", label: "TJAM - Tribunal de Justica do Amazonas", value: "tjam" },
  { group: "Justica Estadual", label: "TJAP - Tribunal de Justica do Amapa", value: "tjap" },
  { group: "Justica Estadual", label: "TJBA - Tribunal de Justica da Bahia", value: "tjba" },
  { group: "Justica Estadual", label: "TJCE - Tribunal de Justica do Ceara", value: "tjce" },
  { group: "Justica Estadual", label: "TJDFT - Tribunal de Justica do Distrito Federal e Territorios", value: "tjdft" },
  { group: "Justica Estadual", label: "TJES - Tribunal de Justica do Espirito Santo", value: "tjes" },
  { group: "Justica Estadual", label: "TJGO - Tribunal de Justica de Goias", value: "tjgo" },
  { group: "Justica Estadual", label: "TJMA - Tribunal de Justica do Maranhao", value: "tjma" },
  { group: "Justica Estadual", label: "TJMG - Tribunal de Justica de Minas Gerais", value: "tjmg" },
  { group: "Justica Estadual", label: "TJMS - Tribunal de Justica do Mato Grosso do Sul", value: "tjms" },
  { group: "Justica Estadual", label: "TJMT - Tribunal de Justica do Mato Grosso", value: "tjmt" },
  { group: "Justica Estadual", label: "TJPA - Tribunal de Justica do Para", value: "tjpa" },
  { group: "Justica Estadual", label: "TJPB - Tribunal de Justica da Paraiba", value: "tjpb" },
  { group: "Justica Estadual", label: "TJPE - Tribunal de Justica de Pernambuco", value: "tjpe" },
  { group: "Justica Estadual", label: "TJPI - Tribunal de Justica do Piaui", value: "tjpi" },
  { group: "Justica Estadual", label: "TJPR - Tribunal de Justica do Parana", value: "tjpr" },
  { group: "Justica Estadual", label: "TJRJ - Tribunal de Justica do Rio de Janeiro", value: "tjrj" },
  { group: "Justica Estadual", label: "TJRN - Tribunal de Justica do Rio Grande do Norte", value: "tjrn" },
  { group: "Justica Estadual", label: "TJRO - Tribunal de Justica de Rondonia", value: "tjro" },
  { group: "Justica Estadual", label: "TJRR - Tribunal de Justica de Roraima", value: "tjrr" },
  { group: "Justica Estadual", label: "TJRS - Tribunal de Justica do Rio Grande do Sul", value: "tjrs" },
  { group: "Justica Estadual", label: "TJSC - Tribunal de Justica de Santa Catarina", value: "tjsc" },
  { group: "Justica Estadual", label: "TJSE - Tribunal de Justica de Sergipe", value: "tjse" },
  { group: "Justica Estadual", label: "TJSP - Tribunal de Justica de Sao Paulo", value: "tjsp" },
  { group: "Justica Estadual", label: "TJTO - Tribunal de Justica do Tocantins", value: "tjto" },

  { group: "Justica do Trabalho", label: "TRT1 - Tribunal Regional do Trabalho da 1a Regiao", value: "trt1" },
  { group: "Justica do Trabalho", label: "TRT2 - Tribunal Regional do Trabalho da 2a Regiao", value: "trt2" },
  { group: "Justica do Trabalho", label: "TRT3 - Tribunal Regional do Trabalho da 3a Regiao", value: "trt3" },
  { group: "Justica do Trabalho", label: "TRT4 - Tribunal Regional do Trabalho da 4a Regiao", value: "trt4" },
  { group: "Justica do Trabalho", label: "TRT5 - Tribunal Regional do Trabalho da 5a Regiao", value: "trt5" },
  { group: "Justica do Trabalho", label: "TRT6 - Tribunal Regional do Trabalho da 6a Regiao", value: "trt6" },
  { group: "Justica do Trabalho", label: "TRT7 - Tribunal Regional do Trabalho da 7a Regiao", value: "trt7" },
  { group: "Justica do Trabalho", label: "TRT8 - Tribunal Regional do Trabalho da 8a Regiao", value: "trt8" },
  { group: "Justica do Trabalho", label: "TRT9 - Tribunal Regional do Trabalho da 9a Regiao", value: "trt9" },
  { group: "Justica do Trabalho", label: "TRT10 - Tribunal Regional do Trabalho da 10a Regiao", value: "trt10" },
  { group: "Justica do Trabalho", label: "TRT11 - Tribunal Regional do Trabalho da 11a Regiao", value: "trt11" },
  { group: "Justica do Trabalho", label: "TRT12 - Tribunal Regional do Trabalho da 12a Regiao", value: "trt12" },
  { group: "Justica do Trabalho", label: "TRT13 - Tribunal Regional do Trabalho da 13a Regiao", value: "trt13" },
  { group: "Justica do Trabalho", label: "TRT14 - Tribunal Regional do Trabalho da 14a Regiao", value: "trt14" },
  { group: "Justica do Trabalho", label: "TRT15 - Tribunal Regional do Trabalho da 15a Regiao", value: "trt15" },
  { group: "Justica do Trabalho", label: "TRT16 - Tribunal Regional do Trabalho da 16a Regiao", value: "trt16" },
  { group: "Justica do Trabalho", label: "TRT17 - Tribunal Regional do Trabalho da 17a Regiao", value: "trt17" },
  { group: "Justica do Trabalho", label: "TRT18 - Tribunal Regional do Trabalho da 18a Regiao", value: "trt18" },
  { group: "Justica do Trabalho", label: "TRT19 - Tribunal Regional do Trabalho da 19a Regiao", value: "trt19" },
  { group: "Justica do Trabalho", label: "TRT20 - Tribunal Regional do Trabalho da 20a Regiao", value: "trt20" },
  { group: "Justica do Trabalho", label: "TRT21 - Tribunal Regional do Trabalho da 21a Regiao", value: "trt21" },
  { group: "Justica do Trabalho", label: "TRT22 - Tribunal Regional do Trabalho da 22a Regiao", value: "trt22" },
  { group: "Justica do Trabalho", label: "TRT23 - Tribunal Regional do Trabalho da 23a Regiao", value: "trt23" },
  { group: "Justica do Trabalho", label: "TRT24 - Tribunal Regional do Trabalho da 24a Regiao", value: "trt24" },

  { group: "Justica Eleitoral", label: "TRE-AC - Tribunal Regional Eleitoral do Acre", value: "tre-ac" },
  { group: "Justica Eleitoral", label: "TRE-AL - Tribunal Regional Eleitoral de Alagoas", value: "tre-al" },
  { group: "Justica Eleitoral", label: "TRE-AM - Tribunal Regional Eleitoral do Amazonas", value: "tre-am" },
  { group: "Justica Eleitoral", label: "TRE-AP - Tribunal Regional Eleitoral do Amapa", value: "tre-ap" },
  { group: "Justica Eleitoral", label: "TRE-BA - Tribunal Regional Eleitoral da Bahia", value: "tre-ba" },
  { group: "Justica Eleitoral", label: "TRE-CE - Tribunal Regional Eleitoral do Ceara", value: "tre-ce" },
  { group: "Justica Eleitoral", label: "TRE-DFT - Tribunal Regional Eleitoral do Distrito Federal", value: "tre-dft" },
  { group: "Justica Eleitoral", label: "TRE-ES - Tribunal Regional Eleitoral do Espirito Santo", value: "tre-es" },
  { group: "Justica Eleitoral", label: "TRE-GO - Tribunal Regional Eleitoral de Goias", value: "tre-go" },
  { group: "Justica Eleitoral", label: "TRE-MA - Tribunal Regional Eleitoral do Maranhao", value: "tre-ma" },
  { group: "Justica Eleitoral", label: "TRE-MG - Tribunal Regional Eleitoral de Minas Gerais", value: "tre-mg" },
  { group: "Justica Eleitoral", label: "TRE-MS - Tribunal Regional Eleitoral do Mato Grosso do Sul", value: "tre-ms" },
  { group: "Justica Eleitoral", label: "TRE-MT - Tribunal Regional Eleitoral do Mato Grosso", value: "tre-mt" },
  { group: "Justica Eleitoral", label: "TRE-PA - Tribunal Regional Eleitoral do Para", value: "tre-pa" },
  { group: "Justica Eleitoral", label: "TRE-PB - Tribunal Regional Eleitoral da Paraiba", value: "tre-pb" },
  { group: "Justica Eleitoral", label: "TRE-PE - Tribunal Regional Eleitoral de Pernambuco", value: "tre-pe" },
  { group: "Justica Eleitoral", label: "TRE-PI - Tribunal Regional Eleitoral do Piaui", value: "tre-pi" },
  { group: "Justica Eleitoral", label: "TRE-PR - Tribunal Regional Eleitoral do Parana", value: "tre-pr" },
  { group: "Justica Eleitoral", label: "TRE-RJ - Tribunal Regional Eleitoral do Rio de Janeiro", value: "tre-rj" },
  { group: "Justica Eleitoral", label: "TRE-RN - Tribunal Regional Eleitoral do Rio Grande do Norte", value: "tre-rn" },
  { group: "Justica Eleitoral", label: "TRE-RO - Tribunal Regional Eleitoral de Rondonia", value: "tre-ro" },
  { group: "Justica Eleitoral", label: "TRE-RR - Tribunal Regional Eleitoral de Roraima", value: "tre-rr" },
  { group: "Justica Eleitoral", label: "TRE-RS - Tribunal Regional Eleitoral do Rio Grande do Sul", value: "tre-rs" },
  { group: "Justica Eleitoral", label: "TRE-SC - Tribunal Regional Eleitoral de Santa Catarina", value: "tre-sc" },
  { group: "Justica Eleitoral", label: "TRE-SE - Tribunal Regional Eleitoral de Sergipe", value: "tre-se" },
  { group: "Justica Eleitoral", label: "TRE-SP - Tribunal Regional Eleitoral de Sao Paulo", value: "tre-sp" },
  { group: "Justica Eleitoral", label: "TRE-TO - Tribunal Regional Eleitoral do Tocantins", value: "tre-to" },

  { group: "Justica Militar", label: "TJMMG - Tribunal de Justica Militar de Minas Gerais", value: "tjmmg" },
  { group: "Justica Militar", label: "TJMRS - Tribunal de Justica Militar do Rio Grande do Sul", value: "tjmrs" },
  { group: "Justica Militar", label: "TJMSP - Tribunal de Justica Militar de Sao Paulo", value: "tjmsp" }
];

const DEFAULT_PAGE_SIZE = 10;
const ALL_TRIBUNALS_VALUE = "__all__";
const ALL_TRIBUNALS_LABEL = "Todos os tribunais";
const ALL_TRIBUNALS_CONCURRENCY = 5;
const SEARCH_MODES = [
  { value: "processo", label: "Processo" },
  { value: "oab", label: "OAB" },
  { value: "termo", label: "Termo" }
];
const UF_OPTIONS = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO"
];

function buildOabVariants(numero, uf) {
  const cleanNumber = numero.replace(/\D/g, "");
  const cleanUf = uf.trim().toUpperCase();

  return [
    `${cleanUf}${cleanNumber}`,
    `${cleanUf} ${cleanNumber}`,
    `${cleanNumber}${cleanUf}`,
    `${cleanNumber} ${cleanUf}`,
    `${cleanNumber}/${cleanUf}`,
    `${cleanNumber}-${cleanUf}`,
    `OAB ${cleanUf} ${cleanNumber}`,
    `OAB/${cleanUf} ${cleanNumber}`,
    `OAB ${cleanNumber} ${cleanUf}`,
    `OAB ${cleanNumber}/${cleanUf}`
  ];
}

function buildSearchBody({ searchMode, termo, oabNumero, oabUf, dataInicio, dataFim, page, pageSize }) {
  const trimmedTerm = termo.trim();
  const digitsOnly = trimmedTerm.replace(/\D/g, "");
  const oabDigits = oabNumero.replace(/\D/g, "");
  const must = [];
  const filter = [];

  if (searchMode === "oab" && oabDigits && oabUf) {
    const variants = buildOabVariants(oabNumero, oabUf);

    must.push({
      bool: {
        should: [
          {
            query_string: {
              query: variants.map((variant) => `"${variant}"`).join(" OR "),
              fields: ["*"],
              default_operator: "OR",
              lenient: true
            }
          },
          {
            bool: {
              must: [
                {
                  query_string: {
                    query: `"${oabDigits}"`,
                    fields: ["*"],
                    lenient: true
                  }
                },
                {
                  query_string: {
                    query: `"${oabUf}"`,
                    fields: ["*"],
                    lenient: true
                  }
                }
              ]
            }
          }
        ],
        minimum_should_match: 1
      }
    });
  } else if (searchMode === "processo" && digitsOnly) {
    must.push({
      bool: {
        should: [
          { term: { "numeroProcesso.keyword": digitsOnly } },
          { term: { numeroProcesso: digitsOnly } },
          {
            match: {
              numeroProcesso: {
                query: digitsOnly,
                operator: "and"
              }
            }
          }
        ],
        minimum_should_match: 1
      }
    });
  } else if (trimmedTerm) {
    must.push({
      bool: {
        should: [
          {
            multi_match: {
              query: trimmedTerm,
              fields: [
                "numeroProcesso^4",
                "classe.nome^2",
                "assuntos.nome^2",
                "orgaoJulgador.nome",
                "movimentos.nome^3",
                "movimentos.complementosTabelados.nome",
                "movimentos.complementosTabelados.descricao"
              ],
              operator: "and",
              type: "best_fields"
            }
          },
          {
            query_string: {
              query: `"${trimmedTerm}"`,
              fields: ["*"],
              lenient: true
            }
          }
        ],
        minimum_should_match: 1
      }
    });
  } else {
    must.push({ match_all: {} });
  }

  if (dataInicio || dataFim) {
    const range = {
      format: "strict_date_optional_time"
    };

    if (dataInicio) {
      range.gte = `${dataInicio}T00:00:00`;
    }

    if (dataFim) {
      range.lte = `${dataFim}T23:59:59`;
    }

    filter.push({
      bool: {
        should: [
          {
            range: {
              dataHoraUltimaAtualizacao: range
            }
          },
          {
            range: {
              dataAjuizamento: range
            }
          },
          {
            range: {
              "movimentos.dataHora": range
            }
          }
        ],
        minimum_should_match: 1
      }
    });
  }

  return {
    from: page * pageSize,
    size: pageSize,
    track_total_hits: true,
    sort: [
      {
        dataHoraUltimaAtualizacao: {
          order: "desc",
          unmapped_type: "date"
        }
      }
    ],
    query: {
      bool: {
        must,
        filter
      }
    },
    _source: [
      "numeroProcesso",
      "classe.nome",
      "assuntos.nome",
      "orgaoJulgador.nome",
      "sistema.nome",
      "grau",
      "dataAjuizamento",
      "dataHoraUltimaAtualizacao",
      "movimentos"
    ]
  };
}

async function fetchDatajudSearch(tribunalValue, body) {
  const response = await fetch(`/api-datajud/api_publica_${tribunalValue}/_search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: DATAJUD_API_KEY
    },
    body: JSON.stringify(body)
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload?.error?.reason || payload?.message || "A API do Datajud retornou erro.";
    throw new Error(message);
  }

  return payload;
}

function formatDate(value) {
  if (!value) {
    return "Nao informado";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(date);
}

function getTotalHits(total) {
  if (typeof total === "number") {
    return total;
  }

  return total?.value ?? 0;
}

function getNames(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "Nao informado";
  }

  return items.map((item) => item?.nome).filter(Boolean).join(", ") || "Nao informado";
}

function getLastMovement(movimentos) {
  if (!Array.isArray(movimentos) || movimentos.length === 0) {
    return null;
  }

  return getMovements(movimentos)[0] ?? null;
}

function getMovements(movimentos) {
  if (!Array.isArray(movimentos)) {
    return [];
  }

  return [...movimentos].sort((first, second) => {
    const firstTime = new Date(first?.dataHora ?? 0).getTime();
    const secondTime = new Date(second?.dataHora ?? 0).getTime();
    return (Number.isNaN(secondTime) ? 0 : secondTime) - (Number.isNaN(firstTime) ? 0 : firstTime);
  });
}

function getComplementosText(complementos) {
  if (!Array.isArray(complementos) || complementos.length === 0) {
    return "";
  }

  return complementos
    .map((complemento) => [complemento?.nome, complemento?.descricao].filter(Boolean).join(" - "))
    .filter(Boolean)
    .join(" | ");
}

function getHitTimestamp(hit) {
  const value = hit?._source?.dataHoraUltimaAtualizacao || hit?._source?.dataAjuizamento;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function getTribunalByValue(value) {
  return TRIBUNAIS.find((item) => item.value === value);
}

function enrichHits(hits, tribunalInfo) {
  return hits.map((hit) => ({
    ...hit,
    _resultKey: `${tribunalInfo.value}-${hit._id}`,
    _tribunal: tribunalInfo.value,
    _tribunalLabel: tribunalInfo.label
  }));
}

async function runWithConcurrency(items, limit, task, onProgress) {
  const output = [];
  let cursor = 0;
  let completed = 0;

  async function worker() {
    while (cursor < items.length) {
      const item = items[cursor];
      cursor += 1;

      try {
        output.push({ status: "fulfilled", value: await task(item), item });
      } catch (reason) {
        output.push({ status: "rejected", reason, item });
      } finally {
        completed += 1;
        onProgress?.(completed, items.length);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return output;
}

export default function App() {
  const [tribunal, setTribunal] = useState("tjsp");
  const [searchMode, setSearchMode] = useState("processo");
  const [termo, setTermo] = useState("");
  const [oabNumero, setOabNumero] = useState("");
  const [oabUf, setOabUf] = useState("SP");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(0);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [took, setTook] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchInfo, setSearchInfo] = useState("");

  const groupedTribunais = useMemo(() => {
    return TRIBUNAIS.reduce((groups, item) => {
      if (!groups[item.group]) {
        groups[item.group] = [];
      }
      groups[item.group].push(item);
      return groups;
    }, {});
  }, []);

  const isAllTribunals = tribunal === ALL_TRIBUNALS_VALUE;
  const selectedTribunal = isAllTribunals
    ? { label: ALL_TRIBUNALS_LABEL, value: ALL_TRIBUNALS_VALUE }
    : getTribunalByValue(tribunal);
  const endpoint = isAllTribunals
    ? `/api-datajud/api_publica_{tribunal}/_search em ${TRIBUNAIS.length} tribunais`
    : `/api-datajud/api_publica_${tribunal}/_search`;
  const displayedResults = isAllTribunals ? results.slice(page * pageSize, page * pageSize + pageSize) : results;
  const pageCount = isAllTribunals
    ? Math.max(1, Math.ceil(results.length / pageSize))
    : Math.max(1, Math.ceil(total / pageSize));
  const inputLabel = searchMode === "processo" ? "Numero do processo" : "Termo de pesquisa";
  const inputPlaceholder =
    searchMode === "processo" ? "Ex: 0012045-65.2025.5.15.0083" : "Ex: intimacao, audiencia ou nome do orgao";

  async function runSearch(nextPage = 0) {
    if (searchMode === "oab" && (!oabNumero.trim() || !oabUf)) {
      setSearched(true);
      setResults([]);
      setTotal(0);
      setTook(null);
      setError("Informe o numero da OAB e o estado.");
      return;
    }

    if (isAllTribunals && searchMode !== "oab" && !termo.trim()) {
      setSearched(true);
      setResults([]);
      setTotal(0);
      setTook(null);
      setError("Informe um numero de processo ou termo antes de buscar em todos os tribunais.");
      return;
    }

    setLoading(true);
    setError("");
    setSearchInfo(isAllTribunals ? `Consultando 0/${TRIBUNAIS.length} tribunais...` : "");
    setSearched(true);

    const searchArgs = {
      searchMode,
      termo,
      oabNumero,
      oabUf,
      dataInicio,
      dataFim,
      page: nextPage,
      pageSize
    };

    try {
      if (isAllTribunals) {
        const startedAt = performance.now();
        const perTribunalPageSize = searchMode === "processo" ? 1 : Math.min(pageSize, 10);
        const body = buildSearchBody({
          ...searchArgs,
          page: 0,
          pageSize: perTribunalPageSize
        });

        const responses = await runWithConcurrency(
          TRIBUNAIS,
          ALL_TRIBUNALS_CONCURRENCY,
          async (tribunalInfo) => {
            const payload = await fetchDatajudSearch(tribunalInfo.value, body);
            return { tribunalInfo, payload };
          },
          (done, totalItems) => {
            setSearchInfo(`Consultando ${done}/${totalItems} tribunais...`);
          }
        );

        const successful = responses.filter((item) => item.status === "fulfilled");
        const failed = responses.filter((item) => item.status === "rejected");

        if (successful.length === 0) {
          throw new Error("Nenhum tribunal respondeu a consulta. Tente novamente em instantes.");
        }

        const allHits = successful
          .flatMap(({ value }) => {
            const hits = value.payload?.hits?.hits ?? [];
            return enrichHits(hits, value.tribunalInfo);
          })
          .sort((first, second) => getHitTimestamp(second) - getHitTimestamp(first));

        const totalHits = successful.reduce((sum, { value }) => sum + getTotalHits(value.payload?.hits?.total), 0);
        setResults(allHits);
        setTotal(totalHits);
        setTook(Math.round(performance.now() - startedAt));
        setPage(0);
        setSearchInfo(
          `Consulta concluida em ${successful.length}/${TRIBUNAIS.length} tribunais. ${allHits.length.toLocaleString(
            "pt-BR"
          )} resultado(s) carregado(s) para exibicao${failed.length ? `; ${failed.length} tribunal(is) falharam` : ""}.`
        );
        return;
      }

      const body = buildSearchBody(searchArgs);
      const payload = await fetchDatajudSearch(tribunal, body);
      const hits = payload?.hits?.hits ?? [];
      setResults(enrichHits(hits, selectedTribunal ?? { value: tribunal, label: tribunal.toUpperCase() }));
      setTotal(getTotalHits(payload?.hits?.total));
      setTook(payload?.took ?? null);
      setPage(nextPage);
      setSearchInfo("");
    } catch (err) {
      setResults([]);
      setTotal(0);
      setTook(null);
      setSearchInfo("");
      setError(err instanceof Error ? err.message : "Nao foi possivel consultar o Datajud.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    runSearch(0);
  }

  function handleReset() {
    setSearchMode("processo");
    setTermo("");
    setOabNumero("");
    setOabUf("SP");
    setDataInicio("");
    setDataFim("");
    setPageSize(DEFAULT_PAGE_SIZE);
    setPage(0);
    setResults([]);
    setTotal(0);
    setTook(null);
    setSearched(false);
    setError("");
    setSearchInfo("");
  }

  function goToPage(nextPage) {
    const boundedPage = Math.min(Math.max(nextPage, 0), pageCount - 1);
    if (boundedPage !== page) {
      if (isAllTribunals) {
        setPage(boundedPage);
      } else {
        runSearch(boundedPage);
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-ink">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-soft">
              <Scale className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">Datajud Search</h1>
              <p className="mt-1 text-sm text-slate-600">Pesquisa operacional na API publica do CNJ/Datajud.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="block text-xs font-medium uppercase tracking-normal text-slate-500">Tribunais</span>
              <strong className="mt-1 block text-lg text-slate-950">{TRIBUNAIS.length}</strong>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="block text-xs font-medium uppercase tracking-normal text-slate-500">Resultados</span>
              <strong className="mt-1 block text-lg text-slate-950">{total.toLocaleString("pt-BR")}</strong>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="block text-xs font-medium uppercase tracking-normal text-slate-500">Tempo</span>
              <strong className="mt-1 block text-lg text-slate-950">{took === null ? "-" : `${took}ms`}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[390px_minmax(0,1fr)] lg:px-8">
        <form onSubmit={handleSubmit} className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Parametros</h2>
              <p className="mt-1 text-sm text-slate-600">Use numero CNJ, OAB/UF ou termo publico.</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              title="Limpar filtros"
              aria-label="Limpar filtros"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Tipo de busca</span>
              <div className="grid grid-cols-3 rounded-lg border border-slate-300 bg-slate-50 p-1">
                {SEARCH_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => {
                      setSearchMode(mode.value);
                      setError("");
                    }}
                    className={`h-9 rounded-md text-sm font-semibold transition ${
                      searchMode === mode.value ? "bg-white text-emerald-700 shadow-sm" : "text-slate-600 hover:text-slate-950"
                    }`}
                    aria-pressed={searchMode === mode.value}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Building2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                Tribunal
              </span>
              <select
                value={tribunal}
                onChange={(event) => {
                  setTribunal(event.target.value);
                  setPage(0);
                  setResults([]);
                  setTotal(0);
                  setTook(null);
                  setSearched(false);
                  setError("");
                  setSearchInfo("");
                }}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-emerald-100 transition focus:border-emerald-600 focus:ring-4"
              >
                <option value={ALL_TRIBUNALS_VALUE}>{ALL_TRIBUNALS_LABEL}</option>
                {Object.entries(groupedTribunais).map(([group, items]) => (
                  <optgroup key={group} label={group}>
                    {items.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>

            {searchMode === "oab" ? (
              <div className="grid gap-3 sm:grid-cols-[1fr_120px] lg:grid-cols-1 xl:grid-cols-[1fr_120px]">
                <label className="block">
                  <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <IdCard className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                    Numero da OAB
                  </span>
                  <input
                    value={oabNumero}
                    onChange={(event) => setOabNumero(event.target.value)}
                    placeholder="Ex: 345495"
                    inputMode="numeric"
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-emerald-100 transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 text-sm font-medium text-slate-700">Estado</span>
                  <select
                    value={oabUf}
                    onChange={(event) => setOabUf(event.target.value)}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-emerald-100 transition focus:border-emerald-600 focus:ring-4"
                  >
                    {UF_OPTIONS.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ) : (
              <label className="block">
                <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <FileSearch className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                  {inputLabel}
                </span>
                <input
                  value={termo}
                  onChange={(event) => setTermo(event.target.value)}
                  placeholder={inputPlaceholder}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-emerald-100 transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4"
                />
              </label>
            )}

            {searchMode === "oab" && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                A busca por OAB procura referencias publicas nos metadados e movimentos. A API publica do Datajud nao expoe OAB como campo estruturado garantido.
              </div>
            )}

            {isAllTribunals && (
              <div className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-900">
                A busca em todos os tribunais consulta {TRIBUNAIS.length} bases em lotes de {ALL_TRIBUNALS_CONCURRENCY}. Pode levar alguns segundos.
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CalendarDays className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                  Inicio
                </span>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(event) => setDataInicio(event.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-emerald-100 transition focus:border-emerald-600 focus:ring-4"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CalendarDays className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                  Fim
                </span>
                <input
                  type="date"
                  value={dataFim}
                  onChange={(event) => setDataFim(event.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-emerald-100 transition focus:border-emerald-600 focus:ring-4"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 text-sm font-medium text-slate-700">Itens por pagina</span>
              <select
                value={pageSize}
                onChange={(event) => setPageSize(Number(event.target.value))}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-emerald-100 transition focus:border-emerald-600 focus:ring-4"
              >
                <option value={10}>10 resultados</option>
                <option value={25}>25 resultados</option>
                <option value={50}>50 resultados</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
              {loading ? "Pesquisando" : "Pesquisar"}
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-600">
            <span className="block font-medium text-slate-800">Endpoint local</span>
            <code className="mt-1 block break-all text-slate-700">{endpoint}</code>
            <span className="mt-2 block">Destino via Nginx: api-publica.datajud.cnj.jus.br</span>
          </div>
        </form>

        <section className="min-w-0">
          <div className="mb-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Tribunal selecionado</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">{selectedTribunal?.label}</h2>
              <p className="mt-1 text-sm text-slate-600">
                Busca atual: {searchMode === "oab" ? `OAB ${oabUf} ${oabNumero || "-"}` : searchMode === "processo" ? "numero CNJ" : "termo livre"}
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
              {searched ? `${total.toLocaleString("pt-BR")} processo(s) encontrados` : "Aguardando pesquisa"}
            </div>
          </div>

          {error && (
            <div className="mb-4 flex gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <strong className="block">Erro na consulta</strong>
                <span className="mt-1 block break-words">{error}</span>
              </div>
            </div>
          )}

          {searchInfo && !error && (
            <div className="mb-4 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
              {searchInfo}
            </div>
          )}

          {!searched && !loading && (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-soft">
              <FileText className="mx-auto h-10 w-10 text-emerald-700" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold text-slate-950">Pronto para consultar</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
                Escolha o tribunal, selecione o tipo de busca e envie a pesquisa.
              </p>
            </div>
          )}

          {loading && (
            <div className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center shadow-soft">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-emerald-700" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold text-slate-950">Consultando Datajud</h3>
              <p className="mt-2 text-sm text-slate-600">{searchInfo || "Aguarde a resposta da API publica do CNJ."}</p>
            </div>
          )}

          {searched && !loading && results.length === 0 && !error && (
            <div className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center shadow-soft">
              <Search className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold text-slate-950">Nenhum resultado</h3>
              <p className="mt-2 text-sm text-slate-600">
                Ajuste o termo, tribunal ou periodo. Para OAB, tente tambem sem filtro de datas.
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <div className="space-y-4">
                {displayedResults.map((hit) => {
                  const source = hit._source ?? {};
                  const lastMovement = getLastMovement(source.movimentos);
                  const movements = getMovements(source.movimentos);

                  return (
                    <article key={hit._resultKey ?? hit._id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-normal text-emerald-700">Processo</p>
                          <h3 className="mt-1 break-all text-xl font-semibold text-slate-950">
                            {source.numeroProcesso ?? "Numero nao informado"}
                          </h3>
                          {hit._tribunalLabel && (
                            <p className="mt-1 text-sm text-slate-600">{hit._tribunalLabel}</p>
                          )}
                        </div>
                        <span className="inline-flex w-fit items-center rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                          Score {hit._score?.toFixed?.(2) ?? "-"}
                        </span>
                      </div>

                      <dl className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-normal text-slate-500">Classe</dt>
                          <dd className="mt-1 text-sm text-slate-900">{source.classe?.nome ?? "Nao informado"}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-normal text-slate-500">Orgao julgador</dt>
                          <dd className="mt-1 text-sm text-slate-900">{source.orgaoJulgador?.nome ?? "Nao informado"}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-normal text-slate-500">Assuntos</dt>
                          <dd className="mt-1 text-sm text-slate-900">{getNames(source.assuntos)}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-normal text-slate-500">Sistema / grau</dt>
                          <dd className="mt-1 text-sm text-slate-900">
                            {[source.sistema?.nome, source.grau].filter(Boolean).join(" / ") || "Nao informado"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-normal text-slate-500">Ajuizamento</dt>
                          <dd className="mt-1 text-sm text-slate-900">{formatDate(source.dataAjuizamento)}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-normal text-slate-500">Ultima atualizacao</dt>
                          <dd className="mt-1 text-sm text-slate-900">{formatDate(source.dataHoraUltimaAtualizacao)}</dd>
                        </div>
                      </dl>

                      {lastMovement && (
                        <div className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-normal text-emerald-800">Ultimo movimento</p>
                          <p className="mt-1 text-sm text-emerald-950">{lastMovement.nome ?? "Movimento sem descricao"}</p>
                          <p className="mt-1 text-xs text-emerald-800">{formatDate(lastMovement.dataHora)}</p>
                        </div>
                      )}

                      {movements.length > 0 && (
                        <details className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3" open={searchMode === "processo"}>
                          <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                            Todas as movimentacoes ({movements.length})
                          </summary>
                          <ol className="mt-3 max-h-[520px] space-y-3 overflow-auto pr-2">
                            {movements.map((movement, index) => {
                              const complementosText = getComplementosText(movement?.complementosTabelados);

                              return (
                                <li key={`${movement?.dataHora ?? "sem-data"}-${index}`} className="rounded-lg border border-slate-200 bg-white px-3 py-3">
                                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                                    <p className="text-sm font-medium text-slate-950">{movement?.nome ?? "Movimento sem descricao"}</p>
                                    <time className="shrink-0 text-xs text-slate-500">{formatDate(movement?.dataHora)}</time>
                                  </div>
                                  {complementosText && <p className="mt-2 text-xs text-slate-600">{complementosText}</p>}
                                </li>
                              );
                            })}
                          </ol>
                        </details>
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-soft sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600">
                  <p>
                    Pagina {page + 1} de {pageCount.toLocaleString("pt-BR")}
                  </p>
                  {isAllTribunals && (
                    <p className="mt-1">
                      Exibindo {results.length.toLocaleString("pt-BR")} resultado(s) carregado(s) de {total.toLocaleString("pt-BR")} encontrado(s).
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 0 || loading}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= pageCount - 1 || loading}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Proxima
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
