/** @format */

import { Input } from 'antd';

export default function Login() {
  return (
    <>
      <div className='justify-center items-center min-h-screen flex flex-col p-8'>
        <h1 className='text-2xl font-bold mb-4'>Login Page</h1>

        <div>
          <label>username</label>
          <Input />
        </div>

        <div>
          <label>password</label>
          <Input />
        </div>
      </div>
    </>
  );
}
