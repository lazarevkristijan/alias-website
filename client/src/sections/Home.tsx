import "./Home.scss"

const Home = () => {
  return (
    <section>
      <section className="hero">
        <div>
          <h1>НАМЕРИ РЕШЕНИЕТО НА ТВОЯТ ПРОБЛЕМ ВЕДНАГА</h1>

          <img
            src="https://www.svgrepo.com/show/530572/accelerate.svg"
            alt="Service image 1"
            className="hero-img1"
          />
          <img
            src="https://www.svgrepo.com/show/530572/accelerate.svg"
            alt="Service image 2"
            className="hero-img2"
          />
          <img
            src="https://www.svgrepo.com/show/530572/accelerate.svg"
            alt="Service image 3"
            className="hero-img3"
          />
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="s"
              placeholder="Услуга..."
            />
          </form>
        </div>
      </section>
    </section>
  )
}

export default Home
