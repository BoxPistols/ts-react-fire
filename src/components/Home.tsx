import React, { useState } from "react"
import { ShowCount } from "./ShowCount"

export const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <section>
        <h2 className="design-font-en">Home</h2>
        <p>{count}</p>
        <button onClick={(_prev) => setCount((_prev) => count + 1)}>
          Click me
        </button>
      </section>
      <hr />
      <section>
        <div className="flex flex-center">
          ShowCount:{" "}
          <b>
            {/* Propsのnum:string受け取り、stateを渡す */}
            <ShowCount num={count} />
          </b>
        </div>
      </section>
    </>
  )
}
