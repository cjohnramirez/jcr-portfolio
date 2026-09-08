import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { waitForRevealsSettled } from "./helpers/network";

/**
 * Automated accessibility gate.
 *
 * Runs in the default `pnpm test` suite, not behind @redesign, because these
 * are guarantees that must hold from now on rather than a target to chase.
 *
 * Axe catches roughly a third of real accessibility problems — it cannot judge
 * whether alt text is *meaningful* or whether focus order makes sense. The
 * keyboard and focus-ring assertions in redesign.spec.ts cover some of the
 * rest; the QA checklist in docs/portfolio-qa-checklist.md covers the
 * judgement calls that only a person can make.
 */

const ROUTES = [
  "/",
  "/about",
  "/work",
  "/work/road-restoration",
  "/designs",
  "/designs/kingmaker",
  "/archive",
  "/contact",
];

for (const path of ROUTES) {
  test(`${path} has no detectable accessibility violations`, async ({ page }) => {
    await page.goto(path, { waitUntil: "load" });
    await waitForRevealsSettled(page);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    // Report the rule and the element, not just a count — a bare number is
    // not actionable when this fails in CI six months from now.
    const findings = results.violations.map(
      (v) =>
        `${v.id} (${v.impact}) — ${v.help}\n    ${v.nodes
          .slice(0, 3)
          .map((n) => n.target.join(" "))
          .join("\n    ")}`,
    );

    expect(findings, `axe violations on ${path}`).toEqual([]);
  });
}

test("both themes pass contrast checks", async ({ page }) => {
  for (const theme of ["dark", "light"]) {
    await page.addInitScript((t) => {
      try {
        localStorage.setItem("portfolio-theme", t);
      } catch {
        // Storage can be unavailable; the default theme still applies.
      }
    }, theme);
    await page.goto("/work/gcs-system", { waitUntil: "load" });
    await waitForRevealsSettled(page);

    const results = await new AxeBuilder({ page })
      .withRules(["color-contrast"])
      .analyze();

    const failures = results.violations.flatMap((v) =>
      v.nodes.map((n) => `${theme}: ${n.target.join(" ")} — ${n.failureSummary}`),
    );

    expect(failures, `contrast failures in ${theme} theme`).toEqual([]);
  }
});
