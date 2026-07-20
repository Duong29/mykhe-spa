import Img from './Img'

export default function PageHeader({ title, sub, image = '/images/lounge-2.png' }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Img
        src={image}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink-900/70" />
      <div className="container-page relative text-center">
        <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
        <span className="mx-auto mt-5 block h-px w-16 bg-clay-400" />
        {sub && <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/80">{sub}</p>}
      </div>
    </section>
  )
}
