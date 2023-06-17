import { useNavigate } from "@remix-run/react";

export default function HomeButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/")}>Home</button>;
}
