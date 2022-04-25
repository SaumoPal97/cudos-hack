import { useState, useEffect } from "react";
import { useStore } from "./useStore";

function actionByKey(key) {
  const keys = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
  };
  return keys[key];
}

function textureByKey(key, texture) {
  const textures = [
    "dirt",
    "grass",
    "glass",
    "wood",
    "log",
    "block",
    "nft1",
    "nft2",
    "apple",
    "newton",
  ];
  let newTextureIndex;
  console.log("prev ", texture);
  console.log("prev index ", textures.indexOf(texture));
  if (key === "ArrowUp") {
    newTextureIndex =
      textures.indexOf(texture) != -1
        ? (textures.indexOf(texture) + 1) % textures.length
        : 0;
  }
  if (key === "ArrowDown") {
    newTextureIndex =
      textures.indexOf(texture) != -1
        ? (textures.indexOf(texture) - 1 + textures.length) % textures.length
        : 0;
  }
  console.log(textures[newTextureIndex]);
  return textures[newTextureIndex];
}
export const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });
  const [setTexture] = useStore((state) => [state.setTexture]);
  let [texture] = useStore((state) => [state.texture]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.code);
      // Movement key
      if (actionByKey(e.code)) {
        setMovement((state) => ({
          ...state,
          [actionByKey(e.code)]: true,
        }));
      }
      // Change texture key
      if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        const newTexture = textureByKey(e.code, texture);
        setTexture(newTexture);
        texture = newTexture;
      }
    };
    const handleKeyUp = (e) => {
      if (actionByKey(e.code)) {
        setMovement((state) => ({
          ...state,
          [actionByKey(e.code)]: false,
        }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [setTexture]);

  return movement;
};
