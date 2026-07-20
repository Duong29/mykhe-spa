export default function SectionHeading({ eyebrow, title, sub, align = 'center', light = false }) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold tracking-[0.25em] uppercase ${
            light ? 'text-clay-300' : 'text-clay-600'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-display text-3xl leading-tight font-semibold sm:text-4xl lg:text-[2.6rem] ${
          light ? 'text-white' : 'text-ink-800'
        }`}
      >
        {title}
      </h2>
      <span
        className={`mt-5 block h-px w-16 ${centered ? 'mx-auto' : ''} ${
          light ? 'bg-clay-400' : 'bg-clay-500'
        }`}
      />
      {sub && (
        <p className={`mt-5 leading-relaxed ${light ? 'text-ink-100/80' : 'text-ink-500'}`}>{sub}</p>
      )}
    </div>
  )
}
