## Orientation

### Plugin API
**Emits**
* `init`, in the callback sets the plugin as ready
* `orientation`, send the desidered orientation, data is a string and can be either `ladnscape` or `portrait`
* `locked`, sent to prevent orientation changes, data can be `true` to lock or `false` to unlock

**Listens**
* `change` emitted on orientation changes, data must be the current orientation so either `landscape` or `portrait`
