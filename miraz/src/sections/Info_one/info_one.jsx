import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './info_one.css'

const SECTIONS = [
  {
    n: '01',
    title: 'Percepcja & Filtrowanie',
    text: 'Nie poznajemy świata całkowicie obiektywnie. To, czego doświadczamy, jest wypadkową czułości układu nerwowego, sposobu filtrowania informacji i uznawania ich za istotne, a także wcześniejszych doświadczeń, traum, oczekiwań, przekonań i emocji.',
  },
  {
    n: '02',
    title: 'Schematy & Przetrwanie',
    text: 'Dialog wewnętrzny i przekonania o sobie, swoim potencjale oraz intencjach innych mogą być ukształtowane przez lęk, dzieciństwo, nieleczone trudności, toksyczne środowisko lub relacje. Niektóre schematy pomagały nam kiedyś przetrwać, ale dziś mogą już nie służyć.',
  },
  {
    n: '03',
    title: 'Soczewka Przeszłości',
    text: 'Umysł aktywnie interpretuje docierające do niego informacje, nadając im znaczenie na podstawie tego, co już przeżyliśmy. Przeszłe doświadczenia, lęki i przekonania tworzą soczewkę, przez którą patrzymy na świat. Dlatego dwie osoby mogą przeżywać tę samą sytuację zupełnie inaczej — a my sami możemy w przyszłości doświadczyć podobnych sytuacji w nowy sposób.',
  },
  {
    n: '04',
    title: 'Przestrzeń do Zmiany',
    text: 'Nie istnieje jeden uniwersalny wzorzec przeżywania świata. Niektóre interpretacje mogą jednak być nieadekwatne lub powodować cierpienie — ich rozpoznanie otwiera przestrzeń do zmiany.',
  },
]

const HERO_VIDEOS = [
  `${import.meta.env.BASE_URL}background1.mp4`,
  `${import.meta.env.BASE_URL}background3.mp4`,
  `${import.meta.env.BASE_URL}background4.mp4`,
  `${import.meta.env.BASE_URL}background5.mp4`,
  `${import.meta.env.BASE_URL}background6.mp4`,
  `${import.meta.env.BASE_URL}background7.mp4`,
  `${import.meta.env.BASE_URL}background8.mp4`,
]

export default function InfoOne() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef(null)

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length)
  }

  const handleEnded = () => {
    nextVideo()
  }

  const handleError = () => {
    console.warn(`Wideo pod indeksem ${currentIndex} nie działa. Przechodzę dalej...`)
    nextVideo()
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (currentIndex === 0 && !video.src) {
      video.src = HERO_VIDEOS[0]
      video.load()
      video.play()
        .then(() => {
          gsap.fromTo(
            video,
            { opacity: 0, scale: 1.03 },
            { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
          )
        })
        .catch(() => handleError())
      return
    }

    gsap.to(video, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        video.src = HERO_VIDEOS[currentIndex]
        video.load()

        video.play()
          .then(() => {
            gsap.fromTo(
              video,
              { opacity: 0, scale: 1.03 },
              { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
            )
          })
          .catch(() => {
            handleError()
          })
      },
    })
  }, [currentIndex])

  return (
    <section className="info-one">
      <div className="info-one__hero">
        <div className="info-one__video-wrapper">
          <video
            ref={videoRef}
            className="info-one__video"
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            onError={handleError}
          />
          <div className="info-one__video-overlay" />
        </div>

        <h1 className="info-one__title">Rzeczywistość ma wiele odcieni</h1>
      </div>

      <div className="info-one__box">
        <p className="info-one__lead">Nasz umysł nie jest biernym odbiorcą rzeczywistości</p>

        <div className="info-one__list">
          {SECTIONS.map((s) => (
            <article key={s.n} className="info-one__item">
              <span className="info-one__num">[{s.n}]</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </article>
          ))}

          <blockquote className="info-one__quote">
            „Zrozumienie, skąd pochodzą nasze przekonania i czy rzeczywiście są nasze, może stać się
            początkiem zmiany — nie świata, lecz naszej relacji z nim, z innymi i przede wszystkim z
            samym sobą.”
            <cite>— Pracownia Psychologiczna Miraż</cite>
          </blockquote>
        </div>
      </div>
    </section>
  )
}