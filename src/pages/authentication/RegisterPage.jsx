import { Input, Button, Typography, Card } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography variant="h2" className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </Typography>
        </div>

        <form className="mt-10 space-y-6" action="#" method="POST">
          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              Your Name
            </Typography>
            <div className="mt-2">
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                size="md"
                placeholder="Your Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              Your Email
            </Typography>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                size="md"
                placeholder="name@mail.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Typography variant="label" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </Typography>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                size="md"
                placeholder="********"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </Button>
          </div>
        </form>

        <Typography variant="p" className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold leading-6 text-teal-600 hover:text-gray-800">
            Sign In
          </Link>
        </Typography>
      </Card>
    </div>
  );
}

export default RegisterPage;
