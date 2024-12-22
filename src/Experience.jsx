import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import { Physics } from "@react-three/rapier";
import Player from "./Player.jsx";
export default function Experience() {
  return (
    <>
      <Physics debug>
        <Lights />

        <Level />
        <Player />
      </Physics>
    </>
  );
}
