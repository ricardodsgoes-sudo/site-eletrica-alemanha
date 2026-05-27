# DRI Elektrotechnik — Site comercial focado em leads

Redesign do site de **DRI Elektrotechnik** (Elektrofachbetrieb em Darmstadt). Substitui o site antigo em TYPO3 (`https://www.dri-elektrotechnik.de/`) por uma página moderna, premium e técnica — agora **focada em geração de leads** para os 3 serviços comerciais principais.

> **Idioma do site:** alemão. Comunicação com o usuário (instruções, diálogo) em **português**.

---

## Estratégia atual (foco comercial)

O site **não vende mais "tudo"** — foca em 3 pilares comerciais que geram lead:

1. **Wallboxen Installation** (1.000 € – 3.000 €)
2. **PV-Anlage** (5.000 € – 30.000 €)
3. **Kundendienst** (reparos, serviço, sob consulta)

Elektroinstallation, Smart Home e Gewerbe **não são mais páginas principais**. Podem aparecer como serviços secundários se necessário, mas não no menu principal.

**Objetivo de cada página de serviço:** apresentar a oferta de forma clara, mostrar Kostenrahmen quando aplicável, e **conduzir o visitante para o lead form** da própria página.

---

## Stack & arquivos

Static HTML/CSS/JS puro — pensado para ser aberto direto no navegador ou servido como estático.

```
d:\Projeto dri-elektrotechnik\
├── index.html              # Home — 3 cards (Wallboxen / PV / Kundendienst)
├── wallboxen.html          # Lead page — Wallboxen Installation
├── pv-anlage.html          # Lead page — PV-Anlage
├── kundendienst.html       # Lead page — Kundendienst
├── styles.css              # Sistema de design + estilos compartilhados
├── script.js               # Lenis smooth scroll + interações + vídeo condicional
├── CLAUDE.md               # Este arquivo
├── logo sem fundo.png      # Logo original (raiz, mantida pelo cliente)
├── imagem hero.png         # Hero original (raiz, mantida pelo cliente)
├── video hero.mp4          # Vídeo original (raiz, mantido pelo cliente)
├── template home.png       # Template visual de referência (cliente forneceu)
├── assets/
│   ├── img/                # Imagens otimizadas usadas pelo site
│   │   ├── logo.png, logo-white.png, hero-bg.png
│   │   ├── wallbox.webp, photovoltaik-dach.webp, haustechnik.webp
│   │   └── (demais imagens — algumas legadas, removíveis)
│   └── video/hero.mp4
├── content/                # Copy oficial das páginas (texto pronto, em alemão)
└── D.R.I Elektrotechnik _ Ihr Elektrofachbetrieb aus Darmstadt/
                            # Backup completo do site antigo (87 imagens)
```

**Não criar arquivos `.md` adicionais** (Readme, docs etc.) sem pedido explícito. **Exceção:** arquivos de copy em `content/` são aceitos.

---

## Navbar (atual)

```
Startseite · Wallboxen · PV-Anlage · Kundendienst · Kontakt
```

5 itens — limpo e focado. Removidos: Elektroinstallation, Energie & Wallbox (antigo), Smart Home, Gewerbe.

---

## Páginas — status

| Página | Arquivo | Status |
|---|---|---|
| Home | `index.html` | ✅ Refeita ao novo foco (3 service cards) |
| Wallboxen | `wallboxen.html` | ✅ Com lead form |
| PV-Anlage | `pv-anlage.html` | ✅ Com lead form |
| Kundendienst | `kundendienst.html` | ✅ Com lead form (+ upload de foto) |

### Páginas removidas
- `elektroinstallation.html` ❌ deletada
- `photovoltaik-wallbox.html` ❌ deletada (substituída por wallboxen + pv-anlage)
- `smart-home-knx.html` ❌ deletada

---

## Estrutura padrão das páginas de serviço

Cada uma das 3 lead pages segue o mesmo padrão visual (consistência + cliente quer apresentar):

1. **Header pill** (fixo)
2. **Service-page hero** — eyebrow + headline grande + sub + 2 CTAs + foto à direita (4:3, radius 28px)
3. **Scope-of-work cards** (`.scope-grid`) — 4 etapas para Wallboxen/Kundendienst, 5 para PV
4. **Cost banner** (`.cost-banner`) — Kostenrahmen prominente + botão "Angebot anfragen"
5. **Lead form section** (`.lead-section`) — split sticky: copy à esquerda + form à direita
6. **Process section** (4 etapas reaproveitando `.process-grid`)
7. **Final CTA dark bar**
8. **Footer** (idêntico em todas)

---

## Lead forms

**Backend:** ainda não plugado — `action=""` em todas as 3 páginas. Decisão deliberada para apresentação ao cliente. Integração via Formspree / Web3Forms / PHP é o próximo passo quando definido.

**Campos por página:**

| Wallboxen | PV-Anlage | Kundendienst |
|---|---|---|
| Name * | Name * | Name * |
| Telefon * | Telefon * | Telefon * |
| E-Mail * | E-Mail * | E-Mail * |
| Adresse / Ort * | Adresse / Ort * | Adresse / Ort * |
| Wallbox vorhanden? (radio) | Gebäudetyp (select) | Art des Problems * |
| Parkplatz (radio: 4 opt) | Dachart (select) | Dringlichkeit (radio) |
| Gewünschter Zeitraum (select) | Speicher gewünscht? (radio) | Foto hochladen (file) |
| Nachricht | Wallbox gewünscht? (radio) | Nachricht |
| | Nachricht | |

**Form UX patterns:**
- Radio "chips" como pills (`.form-radio` + `:has(input:checked)`)
- Select com chevron customizado (data URI SVG)
- File input com `::file-selector-button` estilizado
- Label `*` em var(--brand) para required
- Form note discreto sob o botão de submit

---

## Design system (cores, tipo, espaçamento)

### Cores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#ffffff` | Background base |
| `--bg-soft` | `#f5f7fb` | Sections alternadas / lead-section |
| `--bg-muted` | `#eef2f8` | Placeholders, áreas de imagem |
| `--ink` | `#0b1220` | Texto principal |
| `--ink-2` | `#475569` | Texto secundário |
| `--ink-3` | `#94a3b8` | Texto terciário |
| `--line` | `#e4e8f0` | Bordas sutis |
| `--line-strong` | `#cfd6e3` | Bordas mais visíveis |
| `--brand` | `#1d4ed8` | Azul elétrico — primário |
| `--brand-2` | `#2563eb` | Hover |
| `--brand-soft` | `#eaf0ff` | Backgrounds suaves |
| `--accent` | `#06b6d4` | Ciano accent |
| `--graphite` | `#0f172a` | Footer / superfícies escuras |

### Tipografia
- **Headings:** Space Grotesk (500–700, letter-spacing -0.02em)
- **Body:** Inter (400–600)
- Tamanhos via `clamp()`

### Espaçamento
- Container: `max-width: 1200px`, padding-inline fluido
- Sections: `padding: clamp(72px, 9vw, 120px) 0`
- Raios: `--r-sm 8` / `--r-md 12` / `--r-lg 18` / `--r-xl 24`
- Lead form card: radius 22px, padding fluido

### Interações
- Easing padrão: `cubic-bezier(.2, .8, .2, 1)` (`--ease`)
- Lenis smooth scroll (1.15s, lerp 0.1)
- Reveal on scroll: `.reveal` → `.is-visible` via IntersectionObserver
- Respeita `prefers-reduced-motion`

---

## Classes-chave novas (lead pages)

```
.service-page-main           wrapper main
.service-page-hero           hero das lead pages (grid 1fr / 0.92fr)
.service-page-hero-copy      coluna de texto
.service-page-hero-media     foto 4:3 lado direito
.service-page-eyebrow        eyebrow azul com linha curta

.scope-section               background branco
.scope-header                cabeçalho da scope grid
.scope-grid                  grid 4 colunas (responsive)
.scope-grid-5                modifier para 5 colunas (PV)
.scope-card                  card numerado

.cost-banner-section         padding pequeno
.cost-banner                 banner azul claro com ícone + valor + CTA
.cost-banner-value           o número grande

.lead-section                background azul-soft
.lead-grid                   split 0.82fr / 1fr — sticky intro à esquerda
.lead-intro                  copy lateral (sticky no desktop)
.lead-trust                  checklist com check azul à esquerda
.lead-form                   card branco com border e shadow
.lead-form-header            cabeçalho do form
.form-grid                   grid 2 col (responsive)
.form-field                  wrapper de cada campo
.form-field-full             ocupa 2 colunas
.form-input / .form-select / .form-textarea / .form-file
.form-radios                 wrapper de chips de radio
.form-radio                  pill clicável (usa :has(input:checked))
.form-actions                botão + nota legal
```

E na home:
```
.service-grid-3              grid de 3 colunas (era 4)
.service-price               linha de Kostenrahmen no card
.service-price-muted         versão suave (Kundendienst "auf Anfrage")
```

---

## Dados reais do cliente

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

---

## Hero da home (NÃO ALTERAR sem necessidade)

- Full-bleed: imagem `hero-bg.png` + vídeo opcional `hero.mp4` sobreposto
- Vídeo só em viewport ≥ 820px, sem `prefers-reduced-motion`, sem 2G/3G/saveData
- Toca **1 vez** (não loop), fade-out de volta para a imagem ao terminar
- 3 cards glass ancorados ao canto inferior direito: Sicherheit · Effizienz · Zuverlässig (textos adaptados ao novo foco em Wallbox/PV/Kundendienst)

---

## Decisões / preferências do cliente

- **Foco comercial estrito:** Wallboxen, PV, Kundendienst. Nada de "tudo de elétrica". Confirmado em 2026-05-27.
- **Lead form em cada página de serviço** é OBRIGATÓRIO — é o ponto-chave da apresentação ao cliente. Visível sem precisar rolar muito.
- **Hero da home:** estrutura final, não tocar sem motivo.
- **Footer:** "Leistungen" agora lista apenas Wallboxen / PV-Anlage / Kundendienst.
- **Imagens:** `wallbox.webp`, `photovoltaik-dach.webp`, `haustechnik.webp` são as principais em uso. Demais imagens são legadas do redesign anterior e podem ser removidas no futuro.
- **Backend de form:** ainda não plugado — para apresentação inicial bastam os layouts. Próximo passo: Formspree / PHP / outro.

---

## Convenções de código

- **Sem comentários óbvios** no código. Só comentar o "porquê" não-óbvio.
- **Sem emojis** em código ou docs (a menos que o cliente peça).
- Usar `clamp()` para tipografia e espaçamento fluido.
- Imagens: `loading="lazy"` exceto hero (`eager`).
- Acessibilidade: `aria-label`, `aria-hidden` em ícones decorativos, `aria-label` em radiogroups, `required` + `type="email"`/`"tel"` para validação nativa.
- SVG inline para ícones — stroke-width 1.6–2, `currentColor`.
- Breakpoints: 1180 / 1024 / 820 / 560.

---

## Convenções de processo

- **Sempre confirmar antes de mudanças destrutivas** (deletar arquivos, refatorar grande).
- **Perguntar quando há ambiguidade visual** — cliente pediu "dúvidas me pergunte".
- **Ser detalhista** — UX/UI premium, alinhamento, sombras coerentes, hovers sutis.
- Não introduzir bibliotecas pesadas sem necessidade. Lenis é o limite.
- Após cada page concluída, atualizar a tabela de status acima.

---

## Dívida técnica conhecida

- **CSS legado:** `styles.css` ainda contém ~2.000 linhas de estilos das páginas antigas (`.service-hero`, `.energy-*`, `.smart-*`, `.subpage-hero`, `.benefit-*`, etc.). Não estão em uso. Limpeza futura possível — não bloqueia a apresentação.
- **JS legado:** `script.js` tem hooks GSAP (não carregado) com seletores para classes legadas. Inerte em runtime.
- **Backend do form:** não plugado. Submissão atualmente é noop (action vazio).
