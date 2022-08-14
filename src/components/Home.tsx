import React, { useState } from "react";
import { ShowCount } from "./ShowCount";

export const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <section>
        TEST
        <h4 className="design-font-en">{count}</h4>
        <div>
          <button onClick={(_prev) => setCount((_prev) => count + 1)}>
            Click me
          </button>
        </div>
        <div className="flex flex-center">
          <div>ShowCount: </div>
          <div>
            <b>
              {/* Propsのnum:string受け取り、stateを渡す */}
              <ShowCount num={count} />
            </b>
          </div>
        </div>
      </section>
    </>
  );
};
