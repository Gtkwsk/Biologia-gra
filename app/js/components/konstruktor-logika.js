// Logika mechaniki „Konstruktor czterech komórek” (SPEC.md, sekcja 3.2, świat 3). Funkcje czyste.
//
// Reguły wynikają z obecności elementów w typach komórek (data/typy-komorek.js):
// 'tak' – część wymagana, 'czasem' – część dozwolona (u niektórych komórek tego typu),
// 'nie' – część zakazana; brak wpisu ze zdaniem w typ.zdania – też zakazana (np. nić DNA
// w komórce jądrowej, bo jej DNA jest w jądrze komórkowym).

import { zdanieKomorki } from './tabela-logika.js';

export function regula(typ, element) {
  const o = typ.obecnosc[element.id];
  if (o === 'tak') return { decyzja: 'wymagana', zdanie: zdanieKomorki(typ, element) };
  if (o === 'czasem') return { decyzja: 'dozwolona', zdanie: typ.zdania?.[element.id] ?? zdanieKomorki(typ, element) };
  if (o === 'nie') return { decyzja: 'zakazana', zdanie: zdanieKomorki(typ, element) };
  if (typ.zdania?.[element.id]) return { decyzja: 'zakazana', zdanie: typ.zdania[element.id] };
  return { decyzja: 'nieznana', zdanie: null };
}

export function wymagane(typ, czesci) {
  return czesci.filter((id) => typ.obecnosc[id] === 'tak');
}

export function brakujace(typ, czesci, polozone) {
  return wymagane(typ, czesci).filter((id) => !polozone.has(id));
}
