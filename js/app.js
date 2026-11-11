// =============================================================
//  APP-SPECIFIEKE CODE — VERVANG DIT BESTAND PER APP
// =============================================================
// Dit is een eenvoudige demo (lijstje met items) die laat zien hoe de
// koppeling met de schil werkt. De schil (js/core/) regelt opslag,
// versleuteling, sync, vergrendelen en instellingen. Jij levert:
//
//   schemaVersion        → versie van je datamodel (ophogen bij elke modelwijziging)
//   initialData()        → begintoestand van een nieuwe kluis
//   migrate(data)        → oude gegevens omzetten naar het huidige schema
//   merge(local, remote) → twee versies samenvoegen (bij gelijktijdige wijzigingen)
//   screens              → de schermen in de navigatie: [{ id, label, icon }]
//                          (Instellingen komt er vanzelf als laatste bij)
//   render(root, ctx)    → het scherm ctx.screen opbouwen in `root`
//   renderSettings(page, el, ctx) → (optioneel) eigen instellingenpagina's: een
//                          <section id="settings-<page>" class="settings-section" data-app-page>
//                          in index.html met een regel in #settings-menu
//
// ctx.data              huidige gegevens (alleen lezen!)
// ctx.update(fn)        wijzigen: await ctx.update(d => { d.items.push(...) })
// ctx.toast(msg, kind)  melding tonen ('info' | 'ok' | 'error')
// ctx.confirm(msg)      ja/nee-vraag
// ctx.screen            id van het scherm dat nu getoond wordt
// ctx.go(id)            naar een ander scherm
// ctx.setBadge(id, n)   getal op een knop in de navigatie
// ctx.openSettings(p)   Instellingen openen ('sync', 'security', 'backup', …)

import { h } from './core/dom.js';
import { filterControl, emptyState, card } from './core/ui.js';
import { newRecord, alive, updateById, removeById, mergeCollections, purgeTombstones } from './core/records.js';

const SCHEMA = 1;

// Verwijderde records ("tombstones") na zoveel dagen opruimen. Een apparaat dat
// langer offline is geweest, kan een verwijderd record anders terugzetten.
const TOMBSTONE_DAYS = 180;

// Welke items de lijst toont (per sessie; geen gegevens).
let filter = 'all';

export const app = {
  // Schermen in de navigatie. icon: een naam uit core/nav.js (ICONS) of een lijst SVG-paden.
  screens: [
    { id: 'items', label: 'Lijst', icon: 'list' },
    { id: 'summary', label: 'Overzicht', icon: 'chart' },
  ],

  // De schil weigert te bewerken/synchroniseren als gegevens een hoger schema
  // hebben dan dit (dan draait er ergens al een nieuwere app-versie).
  schemaVersion: SCHEMA,

  initialData() {
    return { schema: SCHEMA, items: [] };
  },

  migrate(data) {
    // Voorbeeld voor later:
    // if (data.schema < 2) { data.items.forEach(i => { i.categorie ??= 'overig'; }); data.schema = 2; }
    data.items ??= [];
    data.schema ??= SCHEMA;

    // Opruimen (draait bij elke ontgrendeling).
    data.items = purgeTombstones(data.items, TOMBSTONE_DAYS);
    return data;
  },

  merge(local, remote) {
    return {
      ...remote,
      ...local,
      schema: Math.max(local.schema || 0, remote.schema || 0),
      items: mergeCollections(local.items, remote.items),
    };
  },

  render(root, ctx) {
    const all = alive(ctx.data.items);
    const open = all.filter((i) => !i.done).length;
    ctx.setBadge('items', open);

    if (ctx.screen === 'summary') {
      root.replaceChildren(card('Stand',
        h('p', {}, `${all.length} ${all.length === 1 ? 'item' : 'items'}, waarvan ${open} nog open.`),
        h('div', { class: 'button-row' }, h('button', { class: 'btn', type: 'button', onClick: () => ctx.go('items') }, 'Naar de lijst'))));
      return;
    }

    const items = all
      .filter((i) => filter === 'all' || (filter === 'done') === !!i.done)
      .sort((a, b) => Number(a.done) - Number(b.done) || b.createdAt - a.createdAt);

    const input = h('input', {
      name: 'title', type: 'text', placeholder: 'Nieuw item…', autocomplete: 'off', required: true, 'aria-label': 'Nieuw item',
    });

    const form = h('form', {
      class: 'card add-form',
      onSubmit: async (e) => {
        e.preventDefault();
        const title = input.value.trim();
        if (!title) return;
        await ctx.update((d) => { d.items.push(newRecord({ title, done: false })); });
        root.querySelector('input[name=title]')?.focus();
      },
    }, input, h('button', { class: 'btn btn-primary', type: 'submit' }, 'Toevoegen'));

    const filters = filterControl({
      label: 'Toon',
      options: [{ value: 'all', label: 'Alles' }, { value: 'open', label: 'Open' }, { value: 'done', label: 'Klaar' }],
      value: filter,
      onChange: (v) => { filter = v; app.render(root, ctx); },
    });

    const list = items.length
      ? h('ul', { class: 'card list' }, items.map((item) => h('li', { class: `list-item${item.done ? ' is-done' : ''}` },
        h('label', { class: 'check' },
          h('input', {
            type: 'checkbox',
            checked: item.done,
            onChange: (e) => ctx.update((d) => { updateById(d.items, item.id, { done: e.target.checked }); }),
          }),
          h('span', {}, item.title)),
        h('button', {
          class: 'icon-btn icon-btn-small',
          type: 'button',
          'aria-label': `Verwijder ${item.title}`,
          onClick: () => {
            if (ctx.confirm(`"${item.title}" verwijderen?`)) ctx.update((d) => { removeById(d.items, item.id); });
          },
        }, '✕'))))
      : emptyState('Nog niets hier', 'Voeg je eerste item toe. Alles wordt versleuteld opgeslagen.');

    root.replaceChildren(form, filters, list);
  },
};
