import React from 'react'

const login_card = () => {
    return (
        <div className="card w-full max-w-sm shadow-xl bg-neutral-900">
            <div className="card-body">
                <h2 className="card-title text-center mb-6 text-white">Login</h2>

                <form className="space-y-4">
                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input bg-black text-white"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered bg-black text-white"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-4 pb-5">
                        <button
                            type="submit"
                            className="btn w-full border-none hover:opacity-90"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default login_card