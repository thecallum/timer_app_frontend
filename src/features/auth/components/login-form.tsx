import { ErrorMessage } from '@/components/form'
import { TextInputWithLabel } from '@/components/form/text-input-with-label'
import { ContinueWithGoogle } from '@/features/auth/components/continue-with-google'
import { useState } from 'react'
import Validator from 'validator'

interface Props {
  onSubmit: (props: { email: string; password: string }) => void
}

export const LoginForm = (props: Props) => {
  const { onSubmit } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const errors: { [key: string]: string } = {}

    if (email === null || email.trim() === '') {
      errors['email'] = 'Email cannot be empty'
    } else if (!Validator.isEmail(email)) {
      errors['email'] = 'Email invalid'
    }

    if (password === null || password.trim() === '') {
      errors['password'] = 'Password cannot be empty'
    }

    return errors
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validate()
    setErrors(errors)

    if (Object.keys(errors).length >= 1) {
      return
    }

    onSubmit({
      email,
      password,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextInputWithLabel
          label="Email"
          autoFocus
          value={email}
          setValue={setEmail}
          id="email"
          name="email"
          ariaLabel="Email"
          error={errors?.email}
        />

        {errors?.email && <ErrorMessage message={errors?.email} />}
      </div>

      <div className="mb-4">
        <TextInputWithLabel
          label="Password"
          value={password}
          setValue={setPassword}
          id="password"
          name="password"
          ariaLabel="Password"
          error={errors?.password}
          type="password"
        />

        {errors?.password && <ErrorMessage message={errors?.password} />}
        <div className="flex items-center justify-end">
          <button>Forgot password?</button>
        </div>
      </div>

      <div>
        <button className="bg-purple-600 text-xl mb-8 text-white w-full px-2 py-3 rounded shadow-md">
          Login
        </button>
      </div>

      <ContinueWithGoogle />
    </form>
  )
}
