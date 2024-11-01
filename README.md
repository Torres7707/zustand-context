

# React Store Pattern Demo

A simple demo project to learn the pattern of combining React Context with Zustand for state management.

## What I Learned

- How to create a store using Zustand
- How to wrap Zustand store with React Context
- How to create custom hooks for accessing store state
- How to handle multiple stores
- Type safety with TypeScript

## Code Example

### Store Creation and Provider

```typescript
export function CountProvider({ initialCount, children }: CountProviderProps) {
  const [store] = useState(() =>
    createStore<CountStore>((set) => ({
      count: initialCount,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }))
  );

  return <CountContext.Provider value={store}>{children}</CountContext.Provider>;
}
```

### Custom Hook for Store Access

```typescript
export function useCountStore<T>(selector: (store: CountStore) => T) {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCountStore must be used within a CountProvider");
  }
  return useStore(context, selector);
}
```

## References

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Context Documentation](https://react.dev/reference/react/useContext)

## Note

This is a learning project to understand state management patterns in React. Not intended for production use.

