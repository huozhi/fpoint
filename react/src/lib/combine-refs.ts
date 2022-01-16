function attachRef<T = any>(
  ref: React.MutableRefObject<T> | React.LegacyRef<T>, 
  node: any
) {
  if (typeof ref === 'function') {
    ref(node);
  } else if (typeof ref === 'object' && ref !== null) {
    (ref as React.MutableRefObject<T | null>).current = node;
  }
}

function combineRefs<T = any>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
) {
  return function functionalRef(node: any) {
    refs.filter(ref => ref != null).forEach(ref => attachRef(ref, node));
  }
}

export default combineRefs;
