// PropsをHomeに渡す
export const ShowCount = ({ num }: { num: string | number }) => {
  return (
    <>
      <section>
        <div className="flex flex-center">
          <div>
            <p>{num}</p>
          </div>
        </div>
      </section>
    </>
  )
}
