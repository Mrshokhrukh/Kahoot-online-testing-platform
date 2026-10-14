import { useMemo } from 'react'

const DEFAULT_EDITOR_LANGUAGE = 'javascript'
const EDITOR_HEIGHT = '200px'

function useCodeEditor(language = DEFAULT_EDITOR_LANGUAGE) {
  return useMemo(
    () => ({
      theme: 'vs-dark',
      language,
      height: EDITOR_HEIGHT,
      options: {
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
      },
    }),
    [language],
  )
}

export default useCodeEditor
