# Collector: Közbeszerzési Adatbázis (kozbeszerzes.hu)

Hungarian public procurement database — the official registry for all public tenders and contract award notices.

- **Search UI:** https://www.kozbeszerzes.hu/adatbazis/keres/hirdetmeny/?hl=hu
- **Language:** Hungarian
- **Coverage:** ~2000–present

## Re-running the exploration

```bash
npm run explore:kozbeszerzes
```

Outputs/overwrites `kozbeszerzes-filters.json` in this directory.

## Search filters

### Dropdowns (`<select>`)

| Field name | Label (HU) | Description |
|---|---|---|
| `mv_cpv_list` | CPV kód | CPV procurement category code (EU standard) |
| `mv_mt_kmBeszerzesiTargy` | Beszerzés tárgya | Subject of procurement (goods, works, services, concessions) |
| `mv_mt_kmEljarasTipusa` | Eljárás fajtája | Procedure type (open, restricted, negotiated, etc.) |
| `mt_kmAjanlatKeroTipusa` | Ajánlatkérő típusa | Contracting authority type (ministry, public body, EU body, etc.) |
| `mt_kmAjanlatKeroFoTevekenysege` | Ajánlatkérő tevékenységi köre | Contracting authority main activity (health, energy, finance, etc.) |
| `mv_tipus_nev` | Hirdetmény típusa | Notice type (call for tenders, award notice, decision, etc.) |
| `mt_lapszam` | Lapszám | Publication issue number (year/issue, e.g. `2024/12`) |

### Text inputs

| Field name | Label (HU) | Description |
|---|---|---|
| `mt_kmAjanlatKero` | Ajánlatkérő neve | Contracting authority name |
| `mt_kmNyertesAjanlattevo` | Nyertes ajánlattevő | Winning bidder name |
| `mt_kmTeljesitesHelye` | Teljesítés helye | Place of performance |
| `mt_iktatoszam` | Iktatószám | Registration/reference number |
| `tartalom_kulcsszo` | Tartalomban szereplő kifejezés | Full-text phrase search |
| `qand_tartalom_plain` | Tartalomban szereplő szavak (mind) | Full-text AND keyword search |
| `qor_tartalom_plain` | Tartalomban szereplő szavak (bármelyik) | Full-text OR keyword search |
| `exc_tartalom_plain` | Tartalomban nem szereplő szavak | Full-text exclusion keywords |

### Date ranges

| Field name | Description |
|---|---|
| `dtr_mt_kmJelentkezesiHatarido_from` / `_to` | Application deadline (from / to) |
| `dtr_mt_megjelenesiDatum_from` / `_to` | Publication date (from / to) |

### Hidden / system fields

`csrfmiddlewaretoken`, `created_at`, `or_cpv_list`, `or_mt_kmBeszerzesiTargy`, `or_mt_kmEljarasTipusa`, `or_tipus_nev`, `sort`, `oldal` (page), `cf`, `more`, `search_type`
