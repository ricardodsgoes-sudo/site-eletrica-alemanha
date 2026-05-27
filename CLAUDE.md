# DRI Elektrotechnik — Projeto da Home

Redesign da home de **DRI Elektrotechnik** (Elektrofachbetrieb em Darmstadt). Substitui o site antigo em TYPO3 (`https://www.dri-elektrotechnik.de/`) por uma página moderna, premium e técnica.

> **Idioma do site:** alemão. Comunicação com o usuário (instruções, diálogo) em **português**.

---

## Stack & arquivos

Static HTML/CSS/JS puro — pensado para ser aberto direto no navegador ou servido como estático.

```
d:\Projeto dri-elektrotechnik\
├── index.html              # Página única (home)
├── styles.css              # Sistema de design + estilos da home
├── script.js               # Lenis smooth scroll + interações + vídeo condicional
├── CLAUDE.md               # Este arquivo
├── logo sem fundo.png      # Logo original (raiz, mantida pelo cliente)
├── imagem hero.png         # Hero original (raiz, mantida pelo cliente)
├── video hero.mp4          # Vídeo original (raiz, mantido pelo cliente)
├── template home.png       # Template visual de referência (cliente forneceu)
├── assets/
│   ├── img/                # Imagens otimizadas e renomeadas usadas pela home
│   │   ├── logo.png        # Logo transparente preta (header, fundos claros)
│   │   ├── logo-white.png  # Logo transparente branca (footer e fundos escuros)
│   │   ├── logo.webp       # Logo em webp (legado, removível)
│   │   ├── hero-bg.png     # Imagem do hero (poster do vídeo)
│   │   ├── hero.webp       # Versão antiga (handshake), não usada
│   │   ├── service-elektroinstallation.webp
│   │   ├── service-photovoltaik.webp
│   │   ├── service-smarthome.webp
│   │   ├── service-industrie.webp
│   │   ├── cert-e-check.webp
│   │   ├── cert-e-marke.webp
│   │   ├── cert-knx.webp
│   │   └── cert-rauchwarn.webp
│   └── video/
│       └── hero.mp4        # 4s, ~1.7MB, sem áudio, faststart
├── content/                # Copy oficial das páginas (texto pronto, em alemão)
│   └── page-2-elektroinstallation.md
└── D.R.I Elektrotechnik _ Ihr Elektrofachbetrieb aus Darmstadt/
                            # Backup completo do site antigo (87 imagens — partner logos, services, certs)
```

**Não criar arquivos `.md` adicionais** (Readme, docs etc.) sem pedido explícito. **Exceção:** arquivos de copy em `content/` são aceitos — cliente envia o texto e quer ter um lugar para guardar (ler antes de implementar cada página).

---

## Briefing original (estratégia)

A home substitui o site antigo (que tem muitos serviços espalhados). Nova estratégia: **5 páginas**.

1. **Home** ← em desenvolvimento
2. Elektroinstallation & Sanierung → `/elektroinstallation`
3. Photovoltaik, Speicher & Wallbox → `/photovoltaik-wallbox`
4. Smart Home & KNX → `/smart-home-knx`
5. Gewerbe, Industrie & Sicherheit → `/gewerbe-sicherheit`

A home deve transmitir: **confiança técnica, empresa moderna, organização, segurança, atendimento profissional, soluções completas, tecnologia elétrica atual, energia, automação e infraestrutura**. Evitar visual genérico de "eletricista". Aparência premium, limpa, técnica.

**Tom**: profissional, direto, confiável, comercial. Sem exageros, sem texto publicitário, sem textos longos demais.

---

## Sections da home (status)

Seguir **fielmente** o `template home.png` que o cliente forneceu como referência visual.

| # | Section | Status | Notas |
|---|---|---|---|
| 1 | Header (pill flutuante) | ✅ Pronta | Logo + nav + phone card |
| 2 | Hero | ✅ Pronta — **não alterar** | Imagem full-bleed + vídeo (toca 1x) + 3 cards glass dentro do hero |
| 3 | ~~Trust strip~~ | ❌ **REMOVIDA** | Excluída pelo cliente — os 3 glass do hero cobrem |
| 4 | Unsere Leistungen — 4 service cards | ✅ Pronta | **Template fidelity**: Neubauinstallation / Altbausanierung / Elektroplanung / Netzwerke & Infrastruktur. Header esquerdo, blue title + descrição + bullets check. Cliente reverteu a decisão de usar categorias da home — quer fidelidade total ao template |
| 5 | Planning CTA banner | ✅ Pronta | "Gut geplant ist besser installiert." — card azul-claro com ícone documento+check, texto longo, botão "Jetzt beraten lassen" |
| 6 | So läuft Ihr Projekt ab — 4 etapas | ✅ Pronta | Refeita ao template: badge azul numerado + linha dashed conectando + ícone técnico + título + descrição (centralizado) |
| 7 | Final dark CTA + contatos | ✅ Pronta | Refeita ao template: barra escura horizontal full-bleed com 3 cols (headline / 3 contatos com ícones circulares / botão branco) |
| 8 | ~~Zertifizierungen~~ | ❌ **REMOVIDA** | Não está no template |
| 9 | Footer dark | ✅ Pronta | 4 cols: logo / Leistungen (4 sub-items do template) / Unternehmen / Kontakt com ícones |

---

## Design system

### Cores (CSS vars em `:root`)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#ffffff` | Background base |
| `--bg-soft` | `#f5f7fb` | Sections alternadas (Trust, Process) |
| `--bg-muted` | `#eef2f8` | Placeholders, áreas de imagem |
| `--ink` | `#0b1220` | Texto principal (preto azulado) |
| `--ink-2` | `#475569` | Texto secundário |
| `--ink-3` | `#94a3b8` | Texto terciário, dimmed |
| `--line` | `#e4e8f0` | Bordas sutis |
| `--line-strong` | `#cfd6e3` | Bordas mais visíveis |
| `--brand` | `#1d4ed8` | Azul elétrico profundo — primário |
| `--brand-2` | `#2563eb` | Hover do brand |
| `--brand-soft` | `#eaf0ff` | Backgrounds suaves com tom brand |
| `--accent` | `#06b6d4` | Ciano accent |
| `--energy` | `#10b981` | Verde energia (raramente usado) |
| `--graphite` | `#0f172a` | Footer / superfícies escuras |

### Tipografia
- **Headings:** Space Grotesk (500–700, letter-spacing -0.02em)
- **Body:** Inter (400–600)
- Tamanhos via `clamp()` para fluidez

### Espaçamento
- Container: `max-width: 1200px`, `padding-inline: clamp(20px, 4vw, 40px)`
- Sections: `padding: clamp(72px, 9vw, 120px) 0` (`.section`)
- Raios: `--r-sm 8` / `--r-md 12` / `--r-lg 18` / `--r-xl 24`

### Sombras
- `--shadow-sm`, `--shadow-md`, `--shadow-lg` (graduais)

### Interações
- Easing padrão: `cubic-bezier(.2, .8, .2, 1)` (`--ease`)
- Hovers: `translateY(-2/3/4)` + shadow lift
- Reveal on scroll: classe `.reveal` → `.is-visible` via IntersectionObserver
- **Smooth scroll:** Lenis 1.1.20 via CDN (`duration: 1.15s`, `lerp: 0.1`)
- Respeita `prefers-reduced-motion` (desliga Lenis + reveals)

---

## Dados reais do cliente (extraídos de `dri-elektrotechnik.de`)

```
Razão social:        DRI Elektrotechnik (Einzelunternehmen)
Inhaber:             Denis Rosa Inacio
Verantwortlich:      Sharlene Rosa Inacio
Endereço:            Bernsteinweg 4, 64297 Darmstadt
Telefon fixo:        06151 9699081       → tel:+4961519699081
Telefon móvel:       0160 5531807        → tel:+491605531807
E-Mail:              info@dri-elektrotechnik.de
Öffnungszeiten:      Mo – Fr: 08:00 – 16:00 Uhr
USt-IdNr.:           DE321522537
Handwerkskammer:     Frankfurt-Rhein-Main
Berufshaftpflicht:   Allianz Versicherungs-AG, 10900 Berlin
```

Pode-se usar livremente em qualquer seção.

---

## Header

- **Pill flutuante** fixa no topo (`position: fixed; top: 18px`)
- Container max-width 1200, com fundo translúcido + backdrop-blur, borda branca sutil, radius 100px, sombra suave
- 3 áreas: logo (esq) | nav (centro) | phone card (dir)
- **Nav:** Startseite · Elektroinstallation · Energie & Wallbox · Smart Home · Gewerbe · Kontakt
- **Phone card** à direita = ícone + "Beratung & Service" / número fixo
- **Mobile (< 820px):** nav vira hamburger, phone card some, header encolhe

---

## Hero (NÃO ALTERAR — cliente confirmou)

- Full-bleed: imagem de fundo `hero-bg.png` + vídeo opcional sobreposto
- **Vídeo** carrega só em: viewport ≥ 820px, sem `prefers-reduced-motion`, sem 2G/3G/saveData
- Toca **1 vez** (não loop), fade-out de volta para a imagem ao terminar
- Overlay: gradiente radial branco posicionado em 22% 42% (atrás do título) + linear esq→dir
- Conteúdo: eyebrow ("Elektrofachbetrieb · Darmstadt") + headline grande + sub com keywords em azul + 2 CTAs
- **3 cards glass** ancorados ao canto inferior direito: Sicherheit, Effizienz, Zukunftssicher
- Glass: `rgba(11, 18, 32, 0.42)` + `backdrop-filter: blur(22px)` + borda 14% white + sheen diagonal `::before`

---

## Decisões / preferências do cliente

- **Hero:** finalizado, não tocar mais.
- **Cards glass do hero:** ficam. A duplicação com a Trust strip foi aceita pelo cliente em prol da fidelidade ao template.
- **Fidelidade ao template:** o cliente foi explícito — "precisa ser fiel ao template para não termos retrabalho". Em caso de dúvida entre criatividade própria e o template, **sempre o template ganha**. Copy, layout, ordem, espaçamento — tudo deve replicar fielmente o `template home.png`.
- **Vídeo:** preferiu uma única reprodução (não loop) — sensação de "momento de marca".
- **Imagem hero:** pull-back via `object-position: 60% 40%` para reduzir sensação de zoom.
- **Hero compacta:** removida `min-height`, padding `140/56` (top/bottom).
- **Footer brand:** texto puro "D.R.I Elektrotechnik" em branco (a logo colorida não fica boa no fundo escuro).
- **Conteúdo dos service cards:** ~~usar as 4 categorias da home~~ → **REVERTIDO**. Cliente passou a exigir fidelidade total ao template. Usar exatamente: Neubauinstallation / Altbausanierung / Elektroplanung / Netzwerke & Infrastruktur, com descrições e bullets do template.
- **Strategy nota:** com essa decisão, a home perdeu a visibilidade direta de PV / Smart Home / Gewerbe nas 4 cards principais. Provavelmente o cliente vai adicionar outras sections para essas categorias depois, ou tratá-las só nas inner pages do menu. **Não inventar** sections novas sem alinhar.

---

## Convenções de código

- **Sem comentários óbvios** no código. Só comentar o "porquê" não-óbvio.
- **Sem emojis** em código ou docs (a menos que o cliente peça).
- Usar `clamp()` para tipografia e espaçamento fluido.
- Imagens: `loading="lazy"` exceto hero (`eager`).
- Acessibilidade: `aria-label`, `aria-hidden` em ícones decorativos, foco visível mantido.
- SVG inline para ícones — line, stroke-width 1.6–2, `currentColor`.
- Mobile-first não estrito: o layout desktop é a referência principal (cliente premium B2B). Breakpoints: 1180 / 1024 / 820 / 560.

---

## Convenções de processo

- **Sempre confirmar antes de mudanças destrutivas** (deletar arquivos, refatorar grande, mudar conteúdo crítico).
- **Perguntar quando há ambiguidade visual** — cliente disse explicitamente "dúvidas me pergunte".
- **Ser detalhista ao extremo** — UX/UI premium, alinhamento perfeito, sombras coerentes, hovers sutis.
- Não introduzir bibliotecas pesadas sem necessidade. Lenis (smooth scroll) já é o limite.
- Após cada section concluída, atualizar a tabela de status acima.
