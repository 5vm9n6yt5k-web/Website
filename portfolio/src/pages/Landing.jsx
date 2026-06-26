import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <main className="min-h-screen bg-paper page-enter overflow-hidden">
      <Link
        to="/film"
        aria-label="View projects"
        className="grid min-h-screen grid-cols-1 md:grid-cols-2"
      >
        <div className="flex min-h-[50vh] flex-col justify-center px-6 py-28 sm:px-12 md:min-h-screen md:px-16 lg:px-24">
          <h1
            className="font-display font-normal leading-none text-ink"
            style={{
              fontFamily: '"MilkyWalky", "Milky Walky Regular", Georgia, serif',
              fontSize: 'clamp(82px, 12vw, 155px)',
              letterSpacing: '0',
            }}
          >
            Toby Goldsmith
          </h1>

          <p
            className="mt-5 font-display font-normal text-ink"
            style={{
              fontFamily: '"MilkyWalky", "Milky Walky Regular", Georgia, serif',
              fontSize: 'clamp(28px, 3.4vw, 54px)',
              letterSpacing: '0',
            }}
          >
            Art Department
          </p>
        </div>

        <div className="h-[50vh] overflow-hidden md:h-screen">
          <img
            src="/images/projects/Fanta/Tokyo 09.09.25 III.jpg"
            alt="Portfolio hero"
            className="h-full w-full object-cover"
          />
        </div>
      </Link>
    </main>
  )
}
