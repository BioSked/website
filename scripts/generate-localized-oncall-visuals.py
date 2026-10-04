#!/usr/bin/env python3
"""Render the localized on-call guide diagrams from their reviewed article copy.

The timing and step text below follows the existing locale-specific artwork. Keep
legal examples in sync with the accompanying articles when changing this data.
"""

from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/guides"
LOGO = (ROOT / "src/assets/logos/biosked-logo.svg").read_text(encoding="utf-8")
LOGO_INNER = LOGO.split(">", 1)[1].rsplit("</svg>", 1)[0]

NAVY = "#10264B"
CYAN = "#38ACCA"
MUTED = "#5D6B7B"
PALE = "#D7E1EC"
SURFACE = "#F5F8FB"
BORDER = "#D9E4EC"
WORK = "work"
STANDBY = "standby"
REST = "rest"
COLORS = {WORK: NAVY, STANDBY: PALE, REST: CYAN}


GUIDES = {
    "en-call-schedule": {
        "steps_title": ["Building a call schedule", "in six steps"],
        "steps_subtitle": ["Review fairness before publishing."],
        "steps": [
            (["List the call lines"], ["hours, in-house or home call"]),
            (["Write the rules down"], ["before you fill a single cell"]),
            (["Collect time off", "and requests"], ["with a deadline"]),
            (["Fill in the right order"], ["hard constraints, weekends", "and holidays, then weeknights"]),
            (["Review with the counters"], ["each physician’s gap", "to their fair share"]),
            (["Publish and track swaps"], ["counters follow every swap"]),
        ],
        "timeline_title": ["Time off after call", "or a shift"],
        "timeline_subtitle": ["ACGME rules for residents and fellows,", "not for attendings"],
        "timeline_source": ["Source: ACGME, effective July 1, 2026: Common 6.21.a and 6.22;", "Emergency Medicine 6.17.a."],
        "axis": ["Mon 7 AM", "Mon 7 PM", "Tue 7 AM", "Tue 7 PM", "Wed 7 AM"],
        "hours": 48,
        "legend": [(WORK, "clinical work"), (STANDBY, "handoff"), (REST, "time off")],
        "examples": [
            {"heading": ["24-hour in-house call, any specialty"], "summary": ["24 h on call, up to 4 h of handoff,", "then at least 14 h off"], "segments": [(0, 24, WORK, "24 h call"), (24, 28, STANDBY, ""), (28, 42, REST, "14 h off")]},
            {"heading": ["12-hour ED night shift,", "emergency medicine residents"], "summary": ["12 h night shift, then 12 h off"], "segments": [(12, 24, WORK, "12 h shift"), (24, 36, REST, "12 h off")]},
        ],
    },
    "fr-ch-planning-de-garde": {
        "steps_title": ["Construire un planning", "de garde en six étapes"],
        "steps_subtitle": ["Vérifier l’équité avant publication."],
        "steps": [
            (["Lister les lignes"], ["horaires, garde sur place", "ou piquet"]),
            (["Écrire les règles"], ["avant de remplir la moindre case"]),
            (["Collecter absences", "et souhaits"], ["avec une date limite"]),
            (["Remplir dans le bon ordre"], ["contraintes, week-ends et fériés,", "puis nuits"]),
            (["Relire avec les compteurs"], ["écart de chacun à sa part"]),
            (["Publier et tracer", "les échanges"], ["les compteurs suivent", "chaque échange"]),
        ],
        "timeline_title": ["Repos après une garde de nuit", "ou un piquet"],
        "timeline_subtitle": ["Deux exemples pour les médecins", "soumis à la loi sur le travail"],
        "timeline_source": ["Sources : art. 10, al. 2, OLT 2 (état au 1er février 2026) et", "art. 19, al. 3, OLT 1 (état au 1er septembre 2024)."],
        "axis": ["lun. 20 h", "mar. 2 h", "mar. 8 h", "mar. 14 h", "mar. 20 h"],
        "hours": 24,
        "legend": [(WORK, "travail"), (STANDBY, "piquet"), (REST, "repos")],
        "examples": [
            {"heading": ["Garde de nuit à l’hôpital", "sur 12 heures"], "summary": ["20 h–8 h de garde, puis au moins", "12 h de repos"], "segments": [(0, 12, WORK, "20 h–8 h"), (12, 24, REST, "≥ 12 h repos")]},
            {"heading": ["Piquet à domicile : jamais 4 h", "de repos d’affilée"], "summary": ["Interventions jusqu’à 6 h,", "puis 11 h de repos"], "segments": [(0, 4, STANDBY, "piquet"), (4, 6, WORK, ""), (6, 8, STANDBY, ""), (8, 10, WORK, ""), (10, 21, REST, "11 h repos")]},
        ],
    },
    "nl-wachtrooster": {
        "steps_title": ["Een wachtrooster opmaken", "in zes stappen"],
        "steps_subtitle": ["Controleer de verdeling vóór publicatie."],
        "steps": [
            (["De lijnen oplijsten"], ["uren, ter plaatse of thuiswacht"]),
            (["De regels opschrijven"], ["voor u één vakje invult"]),
            (["Afwezigheden en wensen", "verzamelen"], ["met een uiterste datum"]),
            (["In de juiste volgorde", "invullen"], ["vaste grenzen, weekends en", "feestdagen, dan nachten"]),
            (["Nakijken met de tellers"], ["afwijking van ieders deel"]),
            (["Publiceren en ruilen", "bijhouden"], ["de tellers volgen elke ruil"]),
        ],
        "timeline_title": ["Rust na een prestatie", "van 12 tot 24 uur"],
        "timeline_subtitle": ["Twee voorbeelden voor een arts", "in loondienst of een ASO"],
        "timeline_source": ["Bron: wet van 12 december 2010, art. 5, §§ 2 en 3;", "versie van 1 februari 2011."],
        "axis": ["ma 8 u", "ma 20 u", "di 8 u", "di 20 u", "wo 8 u"],
        "hours": 48,
        "legend": [(WORK, "werk"), (STANDBY, "thuiswacht"), (REST, "rust")],
        "examples": [
            {"heading": ["Wacht ter plaatse van 24 uur"], "summary": ["24 u werk, het maximum,", "daarna 12 u rust"], "segments": [(0, 24, WORK, "24 u werk"), (24, 36, REST, "12 u rust")]},
            {"heading": ["Thuiswacht, oproep om 2 u,", "doorwerken tot 14 u"], "summary": ["12 u werk na de oproep,", "daarna 12 u rust"], "segments": [(12, 18, STANDBY, ""), (18, 30, WORK, "12 u werk"), (30, 42, REST, "12 u rust")]},
        ],
    },
    "de-dienstplan": {
        "steps_title": ["Den Dienstplan in sechs", "Schritten erstellen"],
        "steps_subtitle": ["Fairness vor der Veröffentlichung prüfen."],
        "steps": [
            (["Dienste auflisten"], ["Zeiten, Bereitschaftsdienst", "oder Rufbereitschaft"]),
            (["Regeln festlegen"], ["bevor das erste Feld gefüllt wird"]),
            (["Wünsche sammeln"], ["Abwesenheiten und Wünsche", "mit Stichtag"]),
            (["In Reihenfolge füllen"], ["Vorgaben, dann Wochenenden", "und Feiertage"]),
            (["Mit Zählern prüfen"], ["Abweichung jeder Person", "vom Soll"]),
            (["Veröffentlichen"], ["Tausch dokumentieren,", "Zähler laufen mit"]),
        ],
        "timeline_title": ["Ruhezeit nach dem Dienst"],
        "timeline_subtitle": ["Zwei Beispiele nach dem Arbeitszeitgesetz,", "für Klinikärztinnen und -ärzte"],
        "timeline_source": ["Quelle: § 7 Abs. 9 und § 5 Abs. 3 ArbZG,", "zuletzt geändert durch Gesetz vom 23.10.2024."],
        "axis": ["Mo 8 Uhr", "Mo 20 Uhr", "Di 8 Uhr", "Di 20 Uhr", "Mi 8 Uhr"],
        "hours": 48,
        "legend": [(WORK, "Arbeitszeit"), (STANDBY, "Rufbereitschaft"), (REST, "Ruhezeit")],
        "examples": [
            {"heading": ["24-Stunden-Dienst: 8 h Tagdienst,", "16 h Bereitschaftsdienst"], "summary": ["8 h Tagdienst + 16 h Bereitschaft,", "danach 11 h Ruhezeit"], "segments": [(0, 8, WORK, "Tagdienst"), (8, 24, WORK, "Bereitschaft"), (24, 35, REST, "11 h Ruhe")]},
            {"heading": ["Rufbereitschaft mit 2 h Einsatz:", "Ausgleich später"], "summary": ["Einsatz während Rufbereitschaft;", "Ausgleich der Ruhezeit später"], "segments": [(0, 8, WORK, "Tagdienst"), (8, 20, STANDBY, "Rufbereitschaft"), (20, 22, WORK, ""), (22, 24, STANDBY, ""), (24, 32, WORK, "Tagdienst")]},
        ],
    },
    "de-ch-dienstplan": {
        "steps_title": ["Den Dienstplan in sechs", "Schritten erstellen"],
        "steps_subtitle": ["Fairness vor der Publikation prüfen."],
        "steps": [
            (["Dienste auflisten"], ["Zeiten, im Spital oder auf Pikett"]),
            (["Regeln aufschreiben"], ["bevor das erste Feld gefüllt ist"]),
            (["Absenzen und Wünsche", "sammeln"], ["mit einer klaren Frist"]),
            (["In der richtigen", "Reihenfolge füllen"], ["Vorgaben, Wochenenden und", "Feiertage, dann Nächte"]),
            (["Mit den Zählern prüfen"], ["Abweichung jeder Person", "vom Soll-Anteil"]),
            (["Publizieren und Tausche", "nachführen"], ["die Zähler folgen jedem Tausch"]),
        ],
        "timeline_title": ["Nachtdienst und Pikett"],
        "timeline_subtitle": ["Für Ärztinnen und Ärzte im Spital,", "die dem ArG unterstehen"],
        "timeline_source": ["Quellen: Art. 10 Abs. 2 ArGV 2 (Stand 1. Februar 2026),", "Art. 19 Abs. 3 ArGV 1 (Stand 1. September 2024)."],
        "axis": ["Mo 20 Uhr", "Di 2 Uhr", "Di 8 Uhr", "Di 14 Uhr", "Di 20 Uhr"],
        "hours": 24,
        "legend": [(WORK, "Arbeit"), (STANDBY, "Pikett"), (REST, "Ruhezeit")],
        "examples": [
            {"heading": ["Nachtdienst im Spital", "über 12 Stunden"], "summary": ["20–8 Uhr Nachtdienst, danach", "mindestens 12 h Ruhezeit"], "segments": [(0, 12, WORK, "20–8 Uhr"), (12, 24, REST, "≥ 12 h Ruhe")]},
            {"heading": ["Pikett von zu Hause: nie 4 h", "Ruhe am Stück"], "summary": ["Einsätze bis 6 Uhr, danach", "11 h Ruhezeit"], "segments": [(0, 4, STANDBY, "Pikett"), (4, 6, WORK, ""), (6, 8, STANDBY, ""), (8, 10, WORK, ""), (10, 21, REST, "11 h Ruhe")]},
        ],
    },
    "it-turni-di-guardia": {
        "steps_title": ["Costruire i turni di guardia", "in sei passi"],
        "steps_subtitle": ["Verificare l’equità prima di pubblicare."],
        "steps": [
            (["Elencare le linee"], ["orari, guardia attiva", "o reperibilità"]),
            (["Scrivere le regole"], ["prima di riempire", "una sola casella"]),
            (["Raccogliere assenze", "e desiderata"], ["con una scadenza"]),
            (["Riempire nell’ordine", "giusto"], ["vincoli, weekend e festivi,", "poi notti"]),
            (["Rileggere con i contatori"], ["scarto di ciascuno", "dalla sua quota"]),
            (["Pubblicare e tracciare", "i cambi"], ["i contatori seguono", "ogni cambio"]),
        ],
        "timeline_title": ["Il riposo dopo guardia", "e reperibilità"],
        "timeline_subtitle": ["Due esempi per un dirigente medico", "del SSN"],
        "timeline_source": ["Fonti: D.Lgs. 66/2003, art. 7; CCNL Area Sanità", "23.1.2024, artt. 27, 29 e 30."],
        "axis": ["dom. 8:00", "dom. 20:00", "lun. 8:00", "lun. 20:00", "mar. 8:00"],
        "hours": 48,
        "legend": [(WORK, "lavoro"), (STANDBY, "reperibilità"), (REST, "riposo")],
        "examples": [
            {"heading": ["Guardia notturna di 12 ore,", "dalle 20 alle 8"], "summary": ["Guardia dalle 20 alle 8,", "poi 11 h di riposo"], "segments": [(12, 24, WORK, "12 h guardia"), (24, 35, REST, "11 h riposo")]},
            {"heading": ["Pronta disponibilità di domenica,", "dalle 8 alle 20"], "summary": ["Una giornata di riposo compensativo", "su richiesta"], "segments": [(0, 12, STANDBY, "reperibilità"), (24, 48, REST, "riposo compensativo")]},
        ],
    },
}


def element(tag, attributes, body=None):
    attrs = " ".join(f'{key}="{escape(str(value), quote=True)}"' for key, value in attributes.items())
    return f"<{tag} {attrs}/>" if body is None else f"<{tag} {attrs}>{escape(str(body))}</{tag}>"


def rect(parts, x, y, width, height, fill, radius=0, stroke=None):
    attrs = {"x": x, "y": y, "width": width, "height": height, "fill": fill}
    if radius:
        attrs["rx"] = radius
    if stroke:
        attrs["stroke"] = stroke
        attrs["stroke-width"] = 2
    parts.append(element("rect", attrs))


def text(parts, x, y, value, size, fill=NAVY, weight=400, anchor="start"):
    parts.append(element("text", {"x": x, "y": y, "fill": fill, "font-family": "Arial, sans-serif", "font-size": size, "font-weight": weight, "text-anchor": anchor}, value))


def lines(parts, x, y, values, size, step, fill=NAVY, weight=400):
    for index, value in enumerate(values):
        text(parts, x, y + index * step, value, size, fill, weight)


def start(width, height, title, description):
    return [f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">',
            f'<title id="title">{escape(title)}</title><desc id="desc">{escape(description)}</desc>',
            element("rect", {"width": width, "height": height, "fill": SURFACE})]


def logo(parts, mobile):
    scale = 1.4 if mobile else 1.5
    x = 50 if mobile else 62
    parts.append(f'<g transform="translate({x} 40) scale({scale})">{LOGO_INNER}</g>')


def header(parts, title_lines, subtitle_lines, mobile):
    logo(parts, mobile)
    x = 50 if mobile else 62
    title_size = 42 if mobile else 45
    lines(parts, x, 128, title_lines, title_size, 50, NAVY, 700)
    lines(parts, x, 230, subtitle_lines, 27 if mobile else 25, 34, MUTED)


def save(prefix, kind, mobile, parts):
    parts.append("</svg>")
    name = f"{prefix}-{kind}-v2{'-m' if mobile else ''}.svg"
    (OUTPUT / name).write_text("\n".join(parts) + "\n", encoding="utf-8")
    print(name)


def draw_steps(prefix, data, mobile):
    width, height = (720, 1550) if mobile else (1200, 950)
    parts = start(width, height, " ".join(data["steps_title"]), " ".join(data["steps_subtitle"]))
    header(parts, data["steps_title"], data["steps_subtitle"], mobile)
    card_y, card_height, gap = (310, 190, 14) if mobile else (310, 190, 22)
    for index, (head, caption) in enumerate(data["steps"]):
        row, column = (index, 0) if mobile else divmod(index, 2)
        x = 42 if mobile else (56 if column == 0 else 610)
        y = card_y + row * (card_height + gap)
        card_width = 636 if mobile else 534
        rect(parts, x, y, card_width, card_height, "#FFFFFF", 20, BORDER)
        rect(parts, x, y, 8, card_height, CYAN if index in (2, 3) else NAVY, 4)
        circle_x, circle_y = x + (57 if mobile else 54), y + 56
        parts.append(element("circle", {"cx": circle_x, "cy": circle_y, "r": 30 if mobile else 28, "fill": NAVY}))
        text(parts, circle_x, circle_y + 10, index + 1, 28, "#FFFFFF", 700, "middle")
        text_x = x + (112 if mobile else 105)
        lines(parts, text_x, y + 57, head, 31, 35, NAVY, 700)
        caption_y = y + (132 if len(head) > 1 else 105)
        lines(parts, text_x, caption_y, caption, 27 if mobile else 23, 30, MUTED)
    save(prefix, "steps", mobile, parts)


def draw_timeline(prefix, data, mobile):
    width, height = (720, 1210) if mobile else (1200, 1040)
    parts = start(width, height, " ".join(data["timeline_title"]), " ".join(data["timeline_subtitle"]))
    header(parts, data["timeline_title"], data["timeline_subtitle"], mobile)
    card_x, card_width = (42, 636) if mobile else (56, 1088)
    card_height, card_gap = (330, 25) if mobile else (280, 25)
    first_card_y = 310
    bar_x, bar_width = (68, 584) if mobile else (82, 1036)
    for index, example in enumerate(data["examples"]):
        y = first_card_y + index * (card_height + card_gap)
        rect(parts, card_x, y, card_width, card_height, "#FFFFFF", 24, BORDER)
        text(parts, card_x + 27, y + 51, f"0{index + 1}", 23 if mobile else 21, CYAN, 700)
        lines(parts, card_x + (79 if mobile else 74), y + 50, example["heading"], 31 if mobile else 29, 34, NAVY, 700)
        lines(parts, bar_x, y + (139 if mobile else 119), example["summary"], 26 if mobile else 22, 29, MUTED)
        bar_y = y + (208 if mobile else 169)
        bar_h = 64 if mobile else 58
        rect(parts, bar_x, bar_y, bar_width, bar_h, "#EAF0F5", 10)
        for begin, end, kind, label in example["segments"]:
            seg_x = bar_x + bar_width * begin / data["hours"]
            seg_w = bar_width * (end - begin) / data["hours"]
            rect(parts, round(seg_x, 1), bar_y, round(seg_w, 1), bar_h, COLORS[kind], 8)
            label_size = 22 if mobile else 25
            if label and seg_w > len(label) * label_size * 0.58 + 24:
                text(parts, round(seg_x + seg_w / 2, 1), bar_y + (41 if mobile else 38), label, label_size, "#FFFFFF" if kind == WORK else NAVY, 700, "middle")
        label_y = y + (307 if mobile else 259)
        ticks = [0, 2, 4] if mobile else [0, 1, 2, 3, 4]
        for tick in ticks:
            tick_x = bar_x + bar_width * tick / 4
            parts.append(element("path", {"d": f"M{tick_x:g} {bar_y + bar_h + 8:g} L{tick_x:g} {bar_y + bar_h + 20:g}", "fill": "none", "stroke": MUTED, "stroke-width": 2}))
            anchor = "start" if tick == 0 else ("end" if tick == 4 else "middle")
            text(parts, round(tick_x, 1), label_y, data["axis"][tick], 21 if mobile else 20, MUTED, 500, anchor)
    legend_y = 1050 if mobile else 940
    legend_xs = (50, 255, 490) if mobile else (63, 345, 665)
    for x, (kind, label) in zip(legend_xs, data["legend"]):
        parts.append(element("circle", {"cx": x + 8, "cy": legend_y - 8, "r": 8, "fill": COLORS[kind]}))
        text(parts, x + 26, legend_y, label, 22 if mobile else 21, NAVY, 600)
    source_y = 1101 if mobile else 987
    lines(parts, 50 if mobile else 63, source_y, data["timeline_source"], 21 if mobile else 19, 31, MUTED)
    save(prefix, "timeline", mobile, parts)


for guide_prefix, guide_data in GUIDES.items():
    for narrow in (False, True):
        draw_steps(guide_prefix, guide_data, narrow)
        draw_timeline(guide_prefix, guide_data, narrow)
