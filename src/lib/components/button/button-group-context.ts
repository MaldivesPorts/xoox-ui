import {createContext} from "../../utilities/react-utils";

import {ContextType} from "./use-button-group";

export const [ButtonGroupProvider, useButtonGroupContext] = createContext<ContextType>({
  name: "ButtonGroupContext",
  strict: false,
});
