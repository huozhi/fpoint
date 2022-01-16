export const createHandlerProxy = (handlerMap: Record<string, (event?: Event) => void>) => 
  ((name: string) => (event?: Event) => {
    const handler = handlerMap[name] || (() => {})
    handler(event)
  })

