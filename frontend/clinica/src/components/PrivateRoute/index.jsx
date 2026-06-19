import { Navigate } from "react-router"
import { useAuth } from "../../contexts/AuthContext"

const PrivateRoute = ({ children }) => {
    const { user } = useAuth()
    const token = localStorage.getItem("accessToken")

    if (!user || !token) {
        return <Navigate to="/" replace />
    }

    return children
}

export default PrivateRoute