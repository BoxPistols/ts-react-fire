import React from "react"

// PropsをHomeに渡す
export const ShowCount = ({ num }: { num: string | number }) => {
  return (
    <>
      <section>
        <p>{num}</p>
      </section>
    </>
  )
}
