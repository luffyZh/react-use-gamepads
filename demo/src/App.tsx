import { TetrisProvider } from "@/hooks/useTetris";
import Tetris from "@/components/Tetris";
import "./styles/globals.css";

export default function App() {
  return (
    <TetrisProvider>
      <Tetris />
    </TetrisProvider>
  )
}