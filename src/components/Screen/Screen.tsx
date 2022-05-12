import {ScreenProps} from "./types";

const Screen = ({...rest}: ScreenProps) => {
  return <div className="container mx-auto h-screen" {...rest} />;
};

export default Screen;
