import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { services, tipGuide, formatVnd, formatUsd } from '../data/services'
import PageHeader from '../components/PageHeader'
import ServiceCard from '../components/ServiceCard'
import FilterTabs from '../components/FilterTabs'
import Reveal from '../components/Reveal'
import { IconArrow } from '../components/Icons'

const filters = [
  { key: 'all', labelKey: 'services.catAll' },
  { key: 'massage', labelKey: 'services.catMassage' },
  { key: 'combo', labelKey: 'services.catCombo' },
  { key: 'single', labelKey: 'services.catSingle' },
]

export default function Services() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')

  const visible = useMemo(
    () => (filter === 'all' ? services : services.filter((s) => s.category === filter)),
    [filter],
  )

  return (
    <>
      <PageHeader
        title={t('services.title')}
        sub={t('services.sub')}
        image="/images/menu-board.png"
      />

      <section className="py-16 lg:py-20">
        <div className="container-page">
          {/* Bộ lọc theo nhóm dịch vụ */}
          <FilterTabs
            items={filters.map((f) => ({ key: f.key, label: t(f.labelKey) }))}
            value={filter}
            onChange={setFilter}
          />

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 90}>
                <ServiceCard service={s} clamp={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BẢNG GIÁ CHI TIẾT ---------- */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-ink-800 sm:text-4xl">
              {t('services.title')}
            </h2>
            <span className="mx-auto mt-5 block h-px w-16 bg-clay-500" />
          </Reveal>

          <Reveal delay={100} className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-clay-500/30 text-left">
                  <th className="py-3.5 pr-4 font-semibold text-ink-800">{t('nav.services')}</th>
                  <th className="px-3 py-3.5 text-right font-semibold text-ink-800">30′ / 60′</th>
                  <th className="px-3 py-3.5 text-right font-semibold text-ink-800">90′</th>
                  <th className="py-3.5 pl-3 text-right font-semibold text-ink-800">120′</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => {
                  const cell = (m) => {
                    const p = s.prices.find((x) => x.min === m)
                    if (!p || p.vnd == null) return <span className="text-ink-300">—</span>
                    return (
                      <span className="whitespace-nowrap">
                        <span className="font-medium text-ink-800">{formatVnd(p.vnd)}</span>
                        <span className="ml-1 text-xs text-ink-300">{formatUsd(p.usd)}</span>
                      </span>
                    )
                  }
                  const short = s.prices.find((x) => x.min === 30) ? 30 : 60
                  return (
                    <tr key={s.id} className="border-b border-ink-900/8 hover:bg-clay-50/60">
                      <td className="py-4 pr-4">
                        <Link
                          to={`/dat-lich?service=${s.id}`}
                          className="font-medium text-ink-800 transition hover:text-clay-600"
                        >
                          {t(`services_list.${s.id}.name`)}
                        </Link>
                      </td>
                      <td className="px-3 py-4 text-right">{cell(short)}</td>
                      <td className="px-3 py-4 text-right">{cell(90)}</td>
                      <td className="py-4 pl-3 text-right">{cell(120)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Reveal>

          {/* Gợi ý tip */}
          <Reveal delay={140} className="mt-12 rounded-2xl bg-cream p-6 ring-1 ring-ink-900/5 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-ink-800">
              {t('services.tipTitle')}
            </h3>
            <p className="mt-1.5 text-sm text-ink-500">{t('services.tipNote')}</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {tipGuide.map((tip) => (
                <li
                  key={tip.label}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-ink-900/5"
                >
                  <span className="text-ink-700">{tip.label}</span>
                  <span className="font-medium text-clay-600">
                    {formatVnd(tip.vnd)}
                    <span className="ml-1 text-xs font-normal text-ink-300">
                      {formatUsd(tip.usd)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12 text-center">
            <Link to="/dat-lich" className="btn-primary !px-8 !py-4">
              {t('common.bookNow')} <IconArrow size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
