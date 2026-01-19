"use client";

import { Shield, User, MapPin } from "lucide-react";

interface DemoLoginProps {
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
}

const DemoLogin = ({ setEmail, setPassword }: DemoLoginProps) => {
    const handleDemoLogin = (role: string) => {
        switch (role) {
            case "admin":
                setEmail("super@gmail.com");
                setPassword("123456");
                break;
            case "tourist":
                setEmail("tourist@gmail.com");
                setPassword("123456");
                break;
            case "guide":
                setEmail("habibullah15160@gmail.com");
                setPassword("123456");
                break;
        }
    };

    return (
        <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Quick login for testing:</p>
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => handleDemoLogin("admin")}
                    className="px-4 py-2 text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors flex items-center gap-2"
                >
                    <Shield className="w-4 h-4" />
                    Login as Admin
                </button>

                <button
                    type="button"
                    onClick={() => handleDemoLogin("tourist")}
                    className="px-4 py-2 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-2"
                >
                    <User className="w-4 h-4" />
                    Login as Tourist
                </button>

                <button
                    type="button"
                    onClick={() => handleDemoLogin("guide")}
                    className="px-4 py-2 text-sm bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-2"
                >
                    <MapPin className="w-4 h-4" />
                    Login as Guide
                </button>
            </div>
        </div>
    );
};

export default DemoLogin;