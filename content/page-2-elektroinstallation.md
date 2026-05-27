# Página 2 — Elektroinstallation & Sanierung

Copy oficial fornecida pelo cliente. Pronta para usar quando começarmos a construir esta página interna.

Rota planejada: `/elektroinstallation`

---

## 1. Hero

**Título (H1):**
> Elektroinstallation für Neubau, Sanierung und Modernisierung

**Subtítulo:**
> Sichere und moderne Elektroinstallationen sind die Grundlage für Komfort, Funktion und Sicherheit in jedem Gebäude. DRI Elektrotechnik plant und realisiert Elektroarbeiten für private, gewerbliche und industrielle Projekte — fachgerecht, normgerecht und zukunftssicher.

**Botões:**
- `Beratungstermin vereinbaren` (primário)
- `Projekt anfragen` (secundário)

---

## 2. Barra de benefícios rápidos (4 cards)

| Título | Descrição |
|---|---|
| **Sicherheit** | Normgerechte Installationen für maximale Sicherheit. |
| **Komfort** | Durchdachte Lösungen für mehr Komfort im Alltag. |
| **Effizienz** | Moderne Technik für einen effizienten Energieeinsatz. |
| **Zukunftssicher** | Installationen, die heute schon an morgen denken. |

> Observação: copy ligeiramente diferente da home (na home a "Sicherheit" diz *"Hochwertige Installationen…"*; aqui é *"Normgerechte Installationen…"*). Manter exatamente como o cliente enviou.

---

## 3. Seção principal — introdução

**Eyebrow:** `Unsere Leistungen`

**Título (H2):**
> Elektrotechnik, die perfekt zu Ihrem Gebäude passt

**Intro 1:**
> Vom ersten Plan bis zur fertigen Installation bieten wir Ihnen ein umfassendes Leistungsspektrum für Neubau, Sanierung und Modernisierung.

**Intro 2 (parágrafo adicional):**
> Eine Elektroinstallation muss heute mehr leisten als nur Strom verteilen. Sie soll sicher, flexibel, energieeffizient und auf zukünftige Anforderungen vorbereitet sein.

---

## 4. Cards de serviços internos (4 cards)

### Card 1 — Neubauinstallation

**Anchor:** `#neubauinstallation`

**Descrição:**
> Komplette Elektroinstallation für Wohngebäude, Gewerbeeinheiten und moderne Neubauprojekte.

**Itens (bullets):**
- Planung & Umsetzung
- Verteilung & Stromkreise
- Steckdosen & Beleuchtung
- Netzwerk & Infrastruktur

### Card 2 — Altbausanierung

**Anchor:** `#altbausanierung`

**Descrição:**
> Modernisierung alter Leitungen, Verteiler und Anschlüsse für mehr Sicherheit und zeitgemäße Nutzung.

**Itens (bullets):**
- Erneuerung der Elektroverteilung
- Austausch alter Leitungen
- Sicherheitsprüfung
- Normgerechte Umsetzung

### Card 3 — Elektroplanung

**Anchor:** `#elektroplanung`

**Descrição:**
> Durchdachte Planung von Stromkreisen, Licht, Netzwerk, Schaltern, Steckdosen und technischen Anschlüssen.

**Itens (bullets):**
- Individuelle Planung
- Lastberechnung
- Beleuchtungskonzepte
- Technische Dokumentation

### Card 4 — Netzwerke & Infrastruktur

**Anchor:** `#netzwerke-infrastruktur`

**Descrição:**
> Strukturierte Verkabelung, Netzwerkanschlüsse und technische Infrastruktur für moderne Gebäude.

**Itens (bullets):**
- Netzwerkverkabelung
- Daten & Kommunikation
- Multimedia-Lösungen
- Zukunftssichere Infrastruktur

---

## 5. Bloco comercial / problema

**Título (H3):**
> Gut geplant ist besser installiert.

**Texto:**
> Fehlende Steckdosen, schwache Netzwerke, veraltete Leitungen oder schlecht geplante Verteiler sorgen oft erst nach dem Einzug für Probleme.
>
> Eine saubere Planung verhindert Kosten, spart Zeit und schafft eine Installation, die heute und in Zukunft zuverlässig funktioniert.

**Botão:** `Jetzt beraten lassen`

> Observação: copy levemente diferente da home — aqui inclui *"sorgen oft erst nach dem Einzug für Probleme"* (na home é *"oft erst später für Probleme"*) e adiciona *"spart Zeit"*. Manter como na copy oficial.

---

## 6. Processo (4 etapas)

**Título (H2):**
> So läuft Ihr Projekt ab

| # | Título | Descrição |
|---|---|---|
| 1 | **Beratung** | Wir besprechen Ihre Anforderungen, Ziele und technischen Rahmenbedingungen. |
| 2 | **Aufmaß & Planung** | Vor Ort prüfen wir die Situation und entwickeln eine passende technische Lösung. |
| 3 | **Angebot** | Sie erhalten ein transparentes Angebot mit klar beschriebenem Leistungsumfang. |
| 4 | **Umsetzung** | Unser Team führt die Arbeiten fachgerecht, zuverlässig und sauber aus. |

---

## 7. CTA final

**Título (H2):**
> Sie haben ein Projekt? Wir sind für Sie da.

**Texto:**
> Ob Neubau, Sanierung oder Modernisierung — wir beraten Sie persönlich und finden die passende Lösung für Ihr Gebäude.

> Observação: copy levemente diferente da home — aqui termina com *"…die passende Lösung für Ihr Gebäude."* (na home é só *"…die passende Lösung."*).

**Contatos:**
- **Telefon:** 06151 9699081
- **E-Mail:** info@dri-elektrotechnik.de
- **Standort:** Darmstadt & Umgebung

**Botão:** `Beratung anfragen`

---

## Notas para implementação

- Estrutura de sections é praticamente idêntica à home — pode-se reaproveitar 90%+ do CSS já existente (hero, planning-cta, process, cta-bar, footer).
- **Diferenças em relação à home:**
  - Hero da home termina com "in Darmstadt und Umgebung." — esta termina com "und Modernisierung." (não menciona cidade).
  - Hero tem 2 botões (home tem `Beratung anfragen` + `Leistungen ansehen`).
  - A seção principal tem **2 parágrafos de intro** (a home só tem 1).
  - **Barra de 4 cards** (Sicherheit/Komfort/Effizienz/Zukunftssicher) que **na home foi removida**. Aqui ela permanece — fica entre hero e seção principal.
  - CTA copy levemente expandida.
- Anchors dos cards já estão usados nos links da home e do footer (`/elektroinstallation#neubauinstallation` etc.) — seguir mesmo esquema.
