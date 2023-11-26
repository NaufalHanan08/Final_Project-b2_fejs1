import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Your Name"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-6" fullWidth>
            Sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
