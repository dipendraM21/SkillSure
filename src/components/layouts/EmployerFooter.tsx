/**
 * Slim employer-app footer — shared across all {@link EmployerAppLayout} pages.
 */
export function EmployerFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="shrink-0 border-t border-slate-200/80 bg-white  px-4 py-3 sm:px-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <p className="fs-14 font-normal font-body leading-5 text-[#64748B]">
        © {year} SkillSure. Cognitive Sanctuary Design.
      </p>
    </footer>
  )
}
