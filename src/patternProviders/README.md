## URL Pattern Providers

### Desired usage

`<FluidImage />` / `<LazyFluidImage />` exposes the following

```js
{
  src: string,
  height: number,
  width: number,
}
```

We want users of the component to be able to supply their own pattern functions that match their needs, and create a repository of commonly used providers and patterns e.g. imgix | `withCropPattern`. This pattern would be called, passing in the parameters we expose in the component.

### RFC

__*How do we want to do the following*__

The user can choose to leverage the passed in arguments, or override them.





