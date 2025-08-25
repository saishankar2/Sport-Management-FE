import React, { useState } from 'react'

const login_card = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // Simple validation function - only check for empty inputs
    const validateField = (value, fieldName) => {
        if (!value || value.trim() === '') {
            return `${fieldName} is required`
        }
        return ''
    }

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    // Handle input blur (validate on blur)
    const handleInputBlur = (e) => {
        const { name, value } = e.target
        const fieldName = name === 'username' ? 'Username' : 'Password'
        const error = validateField(value, fieldName)

        setErrors(prev => ({
            ...prev,
            [name]: error
        }))
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate all fields
        const usernameError = validateField(formData.username, 'Username')
        const passwordError = validateField(formData.password, 'Password')
        
        const newErrors = {}
        if (usernameError) newErrors.username = usernameError
        if (passwordError) newErrors.password = passwordError
        
        setErrors(newErrors)
        
        // If there are errors, don't submit
        if (Object.keys(newErrors).length > 0) {
            return
        }
        
        setIsSubmitting(true)
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            console.log('Form submitted:', formData)
            // Add your actual login logic here
            alert('Login successful!')
        } catch (error) {
            console.error('Login error:', error)
            setErrors(prev => ({
                ...prev,
                submit: 'Login failed. Please try again.'
            }))
        } finally {
            setIsSubmitting(false)
        }
    }

    // Check if form is valid
    const isFormValid = () => {
        return formData.username.trim() && formData.password.trim() && 
               !errors.username && !errors.password
    }

    return (
        <div className="card w-full max-w-sm shadow-xl bg-neutral-900">
            <div className="card-body">
                <h2 className="card-title text-center mb-6 text-white">Login</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Username</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            placeholder="Enter your username"
                            className={`input bg-black text-white ${errors.username ? 'border-red-500' : ''}`}
                            required
                        />
                        {errors.username && (
                            <label className="label">
                                <span className="label-text-alt text-red-400">{errors.username}</span>
                            </label>
                        )}
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                placeholder="Enter your password"
                                className={`input input-bordered bg-black text-white w-full ${errors.password ? 'border-red-500' : ''}`}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white z-10"
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.password && (
                            <label className="label">
                                <span className="label-text-alt text-red-400">{errors.password}</span>
                            </label>
                        )}
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                        <div className="alert alert-error">
                            <span className="text-sm">{errors.submit}</span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="form-control mt-4 pb-5">
                        <button
                            type="submit"
                            disabled={!isFormValid() || isSubmitting}
                            className={`btn w-full border-none hover:opacity-90 ${
                                !isFormValid() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Logging in...
                                </span>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default login_card