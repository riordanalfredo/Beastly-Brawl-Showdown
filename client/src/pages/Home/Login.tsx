import React, { useState, useEffect } from "react";
import socket from "../../socket";
import { PopupClean } from "../../components/popups/PopupClean";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { GenericIcon } from "../../components/icons/GenericIcon";
import { OutlineText } from "../../components/texts/OutlineText";

export function LoginPopup({
  onLoginSuccess,
  setExitPopup,
}: {
  onLoginSuccess: () => void;
  setExitPopup: (value: boolean) => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const Exit = () => setExitPopup(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      socket.emit("login", { email, password });
    } else {
      socket.emit("register", { email, username, password });
    }
  };

  useEffect(() => {
    const loginListener = (data: { success: boolean; message: string }) => {
      setMessage(data.message);
      if (data.success) onLoginSuccess();
    };

    const registerListener = (data: { success: boolean; message: string }) => {
      setMessage(data.message);
      if (data.success) {
        setMode("login");
        setMessage("Registration successful! Please log in.");
      }
    };

    socket.on("loginResponse", loginListener);
    socket.on("registerResponse", registerListener);

    return () => {
      socket.off("loginResponse", loginListener);
      socket.emit("set-login");
      socket.off("registerResponse", registerListener);
    };
  }, [onLoginSuccess]);

  return (
    <PopupClean>
      <div className="relative p-4 flex flex-col gap-4">
        {/* Close button inside the box */}
        <div className="absolute -top-20 -right-12">
          <ButtonGeneric color="red" size="small" onClick={Exit}>
            <GenericIcon style="x" colour="stroked" />
          </ButtonGeneric>
        </div>

        {/* Title added here */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 ">
          <OutlineText size="extraLarge">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </OutlineText>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
          <label className="flex flex-col gap-1">
            <OutlineText size="medium">Email:</OutlineText>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 rounded border"
            />
          </label>

          {mode === "register" && (
            <label className="flex flex-col gap-1">
              <OutlineText size="medium">Username:</OutlineText>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="p-2 rounded border"
              />
            </label>
          )}

          <label className="flex flex-col gap-1">
            <OutlineText size="medium">Password:</OutlineText>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 rounded border"
            />
          </label>

          <button
            type="submit"
            className="bg-blackCurrant text-white py-2 rounded outline-consistent"
          >
            {mode === "login" ? "Log In" : "Register"}
          </button>

          {message && <p className="text-red-600">{message}</p>}

          <button
            type="button"
            onClick={() => {
              setMessage("");
              setMode(mode === "login" ? "register" : "login");
            }}
            className="mt-2 underline text-sm outline-consistent"
          >
            {mode === "login"
              ? "Don't have an account? Register here"
              : "Already have an account? Log in here"}
          </button>
        </form>
      </div>
    </PopupClean>
  );
}
