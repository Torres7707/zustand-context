import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

type CountStore = {
	count: number;
	increment: () => void;
};

const CountContext = createContext<StoreApi<CountStore> | undefined>(undefined);

type CountProviderProps = PropsWithChildren<{
	initialCount: number;
}>;

export function CountProvider({ initialCount, children }: CountProviderProps) {
	const [store] = useState(() =>
		createStore<CountStore>((set) => ({
			count: initialCount,
			increment: () => set((state) => ({ count: state.count + 1 })),
		}))
	);

	return (
		<CountContext.Provider value={store}>{children}</CountContext.Provider>
	);
}

export function useCountStore<T>(selector: (store: CountStore) => T) {
	const context = useContext(CountContext);
	if (!context) {
		throw new Error("useCountStore must be used within a CountProvider");
	}
	return useStore(context, selector);
}
