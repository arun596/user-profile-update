import React from 'react'

const MoreInfoPart = () => {
  return (
    <div className="space-y-6">
      {/* Username Section */}
      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mt-1">
        <label className="block text-sm font-medium text-gray-700 pb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="cpassword"
          className="block h-14 w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      </div>
  )
}

export default MoreInfoPart