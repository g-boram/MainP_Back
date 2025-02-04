import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Alert from "../components/shared/Alert";

const Context = createContext(undefined);

export function AlertContextProvider({ children }) {
  const [alertState, setAlertState] = useState({
    open: false,
    title: null,
    description: null,
    onButtonClick: () => {},
    onCancelClick: () => {},
  });

  let $portal_root = document.getElementById("root-portal");
  if (!$portal_root) {
    $portal_root = document.createElement("div");
    $portal_root.id = "root-portal";
    document.body.appendChild($portal_root);
  }

  const close = useCallback(() => {
    setAlertState({
      open: false,
      title: null,
      description: null,
      onButtonClick: () => {},
      onCancelClick: () => {},
    });
  }, []);

  const open = useCallback(
    (options) => {
      setAlertState({
        ...options,
        open: true,
        onButtonClick: () => {
          close();
          options.onButtonClick?.();
        },
        onCancelClick: () => {
          close();
          options.onCancelClick?.();
        },
      });
    },
    [close]
  );

  const values = useMemo(() => ({ open }), [open]);

  return (
    <Context.Provider value={values}>
      {children}
      {createPortal(<Alert {...alertState} />, $portal_root)}
    </Context.Provider>
  );
}

export function useAlertContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAlertContext must be used within an AlertContextProvider");
  }
  return context;
}
