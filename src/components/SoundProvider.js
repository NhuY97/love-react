import GameBgSound from "./sound/GameBgSound";

const SoundProvider = ({ children }) => {
  return (
    <>
      <GameBgSound />
      {children}
    </>
  );
};

export default SoundProvider;
