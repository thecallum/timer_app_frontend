import { ContinueWithGoogleButton } from './continue-with-google-button'

export const ContinueWithGoogle = () => {
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">
          Or continue with Google
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <ContinueWithGoogleButton />
    </>
  )
}
