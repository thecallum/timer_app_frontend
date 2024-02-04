export const Spinner = () => {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="lds-dual-ring-standalone" />
      <span className="ml-2">Loading..</span>
    </div>
  )
}
