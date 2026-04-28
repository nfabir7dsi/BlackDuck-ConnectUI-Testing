# Date Filter DOM Reference

Inspected via Playwright on 2026-04-28 against `http://10.255.185.121:5173/ui/`.
Filter: **First Detected** (same structure applies to any date-type filter).

---

## How to reach the filter dialog

1. Navigate to a project's issue list
2. Click `[data-testid="filters-section"] button:has-text("Add filters")`
3. Click `[role="listbox"] [role="option"]:has-text("First Detected")`
4. Filter dialog opens: `[data-testid="filter-content"]` (a Radix popover, `role="dialog"`)

---

## Date Mode Radio Group

The 6 modes live inside a `[role="radiogroup"]` inside `[data-testid="filter-content"]`.

Each mode row:
```html
<div class="flex items-center space-x-2">
  <button type="button" role="radio" id="date-{value}" data-state="unchecked|checked" ...></button>
  <label for="date-{value}">Label Text</label>
</div>
```

| Label Text       | `id`           | `value`   | Input shown when selected              |
|------------------|----------------|-----------|----------------------------------------|
| In the last      | `date-in`      | `in`      | `input[type="number"]` + combobox      |
| Not in the last  | `date-not`     | `not`     | `input[type="number"]` + combobox      |
| In the range     | `date-range`   | `range`   | 2× calendar picker buttons (From / To) |
| Exclude          | `date-exclude` | `exclude` | 2× calendar picker buttons (From / To) |
| After            | `date-after`   | `after`   | 1× calendar picker button              |
| Before           | `date-before`  | `before`  | 1× calendar picker button              |

### Clicking a mode in Cypress
The radio items are **Radix UI buttons** (`role="radio"`), NOT `<input type="radio">`.
Clicking the label's parent's child button is the reliable approach:
```javascript
cy.getByDataTestId('filter-content')
  .contains('label', modeName)
  .parent()
  .children('button')   // the role="radio" button
  .click();
```

---

## "In the last" / "Not in the last" Inputs

```html
<input
  type="number"
  aria-label='Number of time units for "in the last" filter'
  min="1"
  placeholder="0"
/>
<button
  type="button"
  role="combobox"
  aria-label='Time unit for "in the last" filter'
>days</button>
```

- **Number input**: `input[type="number"]` — use `.clear().type(value)`
- **Unit dropdown**: `button[role="combobox"]` — click opens a listbox; pick option with `.contains(unit)`
- No `data-testid` on either element; select by type or `aria-label`

---

## "In the range" / "Exclude" — Two Calendar Pickers

No `<input>` elements are rendered. Instead two picker buttons appear:

```html
<div class="ml-6 -mt-2 mb-2 space-y-2">
  <div>
    <label class="text-xs text-muted-foreground">From</label>
    <button aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:xxx:" data-state="closed" type="button">
      <svg class="lucide-calendar ..."></svg>
      Pick a date        <!-- changes to the selected date once picked -->
    </button>
  </div>
  <div>
    <label class="text-xs text-muted-foreground">To</label>
    <button aria-haspopup="dialog" ...>Pick a date</button>
  </div>
</div>
```

**Selector for From button:** `[data-testid="filter-content"] button[aria-haspopup="dialog"]` → `.eq(0)`
**Selector for To button:** same → `.eq(1)`

---

## "After" / "Before" — Single Calendar Picker

Same calendar picker button structure, but only one button (no From/To labels).

**Selector:** `[data-testid="filter-content"] button[aria-haspopup="dialog"]` → `.eq(0)`

---

## Calendar Dialog (date picker popover)

Clicking a picker button opens a second Radix popover — a calendar.

```
Selector for the calendar (not the filter dialog):
  [role="dialog"]:not([data-testid="filter-content"])
```

### Navigation buttons (rarely needed — use dropdowns instead)
```html
<button aria-label="Go to the Previous Month" ...></button>
<button aria-label="Go to the Next Month" ...></button>
```

### Month & Year dropdowns (hidden but selectable)
```html
<!-- opacity-0, overlays the visible caption label -->
<select aria-label="Choose the Month" class="... opacity-0 rdp-months_dropdown">
  <option value="0">Jan</option> ... <option value="11">Dec</option>
</select>
<select aria-label="Choose the Year" class="... opacity-0 rdp-years_dropdown">
  <option value="1926">1926</option> ... <option value="2126">2126</option>
</select>
```

Use `{ force: true }` in Cypress since they are `opacity-0`:
```javascript
cy.get(`${calSel} select[aria-label="Choose the Month"]`).select(String(month - 1), { force: true });
cy.get(`${calSel} select[aria-label="Choose the Year"]`).select(String(year), { force: true });
```

### Day buttons
```html
<button aria-label="Wednesday, April 15th, 2026" ...>15</button>
<!-- Today gets a "Today, " prefix: aria-label="Today, Tuesday, April 28th, 2026" -->
```

The `aria-label` format is: `"DayOfWeek, MonthName Dth, YYYY"`
For Cypress, a **partial match** is sufficient: `button[aria-label*="April 15th, 2026"]`

### No text inputs
There is no text input inside the calendar.

---

## Cypress Helper Pattern (used in issueFilterPage.js)

```javascript
_pickDate(pickerIndex, dateStr) {
  // dateStr: "YYYY-MM-DD"  |  pickerIndex: 0 = From/single, 1 = To
  const [year, month, day] = dateStr.split('-').map(Number);
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const ordinal = (n) => {
    if (n > 3 && n < 21) return n + 'th';
    switch (n % 10) {
      case 1: return n + 'st'; case 2: return n + 'nd'; case 3: return n + 'rd';
      default: return n + 'th';
    }
  };
  const partialLabel = `${months[month - 1]} ${ordinal(day)}, ${year}`;
  const calSel = '[role="dialog"]:not([data-testid="filter-content"])';

  cy.getByDataTestId('filter-content')
    .find('button[aria-haspopup="dialog"]').eq(pickerIndex).click();
  cy.wait(300);

  // Jump directly to month/year using the hidden <select> dropdowns
  cy.get(`${calSel} select[aria-label="Choose the Month"]`).select(String(month - 1), { force: true });
  cy.get(`${calSel} select[aria-label="Choose the Year"]`).select(String(year), { force: true });
  cy.wait(200);

  cy.get(`${calSel} button[aria-label*="${partialLabel}"]`).click();
  cy.wait(300);
}
```

---

## Playwright Inspection Scripts

- `inspect-date-filter.js` — the most recent full-inspection script (login → projects → issue list → date filter)
- `date-filter-screenshots/` — screenshots + `summary.json` from the last run