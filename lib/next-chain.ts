/**
 * "Next" through grouped pages, where a reader finishes the group they
 * started in before moving to the other one.
 *
 * Pages are static, so where the reader started travels in the URL as
 * `?from=<slug>`. Without it, the current page is the start. This module is
 * kept free of the portfolio data so the client link can import it.
 */

export type ChainEntry = { slug: string; href: string; title: string };
export type Chain = { current: string; groups: ChainEntry[][] };

export function resolveChain(chain: Chain, from: string | null): { href: string; title: string } {
  const { current, groups } = chain;
  const groupIndex = groups.findIndex((group) => group.some((entry) => entry.slug === current));
  const group = groups[groupIndex];
  const start = from && group.some((entry) => entry.slug === from) ? from : current;

  // The group read from where the reader entered it, wrapping round.
  const offset = group.findIndex((entry) => entry.slug === start);
  const order = [...group.slice(offset), ...group.slice(0, offset)];
  const position = order.findIndex((entry) => entry.slug === current);

  if (position < order.length - 1) {
    const next = order[position + 1];
    return { href: `${next.href}?from=${start}`, title: next.title };
  }

  // Group finished: enter the other group at its first page.
  const next = groups[(groupIndex + 1) % groups.length][0];
  return { href: `${next.href}?from=${next.slug}`, title: next.title };
}
