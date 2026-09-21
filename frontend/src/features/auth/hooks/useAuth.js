import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, passowrd }) => {
        setLoading(true);
        try {
            const data = await login({ email, passowrd });
            setUser(data.user);
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, passowrd }) => {
        setLoading(true);
        try {
            const data = await register(username, email, passowrd);
            setUser(data.user);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, handleLogin, handleRegister, handleLogout };
}